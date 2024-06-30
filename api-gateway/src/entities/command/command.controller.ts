import { Body, Controller, Get, Inject, OnModuleInit, Post } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { CommandService } from "./command.service";
import { Command } from "./command.entity";
import { CommandProductService } from "../command-product/command-product.service";
import { ProductService } from "../product/product.service";
import { CreateOrderRequest } from "./create-order-request.dto";
import { OrderCreatedEvent } from "./order-created.event";
import { CreateProductsFormatterDto, ProductFormatterDto } from "./order-formatter.dto";
import { UserService } from "../user/user.service";

@Controller('commands')
export class CommandController implements OnModuleInit {
    constructor(
        @Inject('COMMAND_SERVICE') private readonly commandClient: ClientKafka,
        private commandService: CommandService,
        private productService: ProductService,
        private userService: UserService
    ) {}

    @Get()
    index(): Promise<Command[]> {
        return this.commandService.findAllPopulated();
    }

    onModuleInit() {
        this.commandClient.subscribeToResponseOf('order_created');
    }

    @Post('/order')
    async createOrder(@Body() createOrderRequest: CreateOrderRequest): Promise<any> {
        let userAuth = createOrderRequest.userAuth;

        try {
            let authUser = await this.userService.findOneById(userAuth);
            
            // Produits 
            let productIds = [];
            // Utiliser pour stocker les quantités par productId, utile pour ensuite get la quantité selon l'id 
            let productQuantities = new Map(); 

            // Boucle sur les produits reçus dans le @Body si il y en a
            if (createOrderRequest.productsOrder) {
                createOrderRequest.productsOrder.forEach(element => {
                    productIds.push(element.productId);
                    if (element.quantity == 0){
                        return
                    }
                    productQuantities.set(element.productId, element.quantity); 
                });
            }

            // Récupération des produits en base de données
            let commandProducts = await this.productService.findCommandProducts(productIds);

            // Tableaux de produits formatté pour le service mailing
            let productsFormatterDtos = [];

            commandProducts.forEach(element => {
                // On récupère la quantité du produit selon son id
                let quantity = productQuantities.get(element.id);

                // Vérification de la disponibilité du stock.
                console.log(`Quantité du produit : ${quantity}, stock : ${element.stock}`)
                if (quantity > element.stock) {
                    return `${element.name} : Stock insuffisant (${element.stock})`;
                }

                // Création du DTO pour chaque produit
                let productFormatterDto = new ProductFormatterDto();
                productFormatterDto.productId = element.id;
                productFormatterDto.productName = element.name;
                productFormatterDto.quantity = quantity;
                productFormatterDto.price = element.price;

                productsFormatterDtos.push(productFormatterDto);
            });

            // Formatage pour le service command
            let createProductsFormatterDto = new CreateProductsFormatterDto();
            createProductsFormatterDto.products = productsFormatterDtos;
            createProductsFormatterDto.user = authUser.firstname + ' ' + authUser.lastname;

            // Envoi de l'event au micro-service de commande
            this.commandClient.send(
                'order_created',
                new OrderCreatedEvent(createProductsFormatterDto)
            // Retour de réponse du service de commande
            ).subscribe((command) => {
                // Problème rencontré lors de la création de la commande
                if (!command) {
                    return "Une erreur est survenue lors du traitement de la commande par le service commande."
                } else {
                    // Boucle sur les produits de la commande
                    let newCommandProducts = command.products.map(product => {
                        return `produit : ${product.productName} x ${product.quantity} = ${product.price * product.quantity}€`;
                    }).join('\n                     ');
                    
                    console.log(`
                    Commande N°${command.commandId} enregistrée.
                    Utilisateur : ${command.user}.
                    Produits de la commande : 
                        ${newCommandProducts}
                    Prix total de la commande : ${command.price}€.
                    `);  
                    
                    commandProducts.forEach(element => {
                        let quantity = productQuantities.get(element.id);
                        // Mise à jour du stock
                        element.stock -= quantity;
                        this.productService.update(element);
                        console.log(`Stock du produit : ${element.name} mis à jour.`);
                    })
                }
            });

        } catch (error) {
            console.error(error);
            throw new Error("Erreur lors de l'authentification de l'utilisateur.");
        }
    }
}

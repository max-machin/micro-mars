// NEST
import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";

// Command
import { CommandService } from "./command.service";
import { Command } from "./command.entity";

// Command Product
import { CommandProduct } from "../command-product/command-product.entity";
import { CommandProductService } from "../command-product/command-product.service";

// Product
import { ProductService } from "../product/product.service";

// Request + event
import { CreateOrderRequest } from "./create-order-request.dto";
import { OrderCreatedEvent } from "./order-created.event";
import { CommandPrice, CreateProductsFormatterDto, ProductFormatterDto } from "./order-formatter.dto";

@Controller('commands')
export class CommandController {
    constructor(
        @Inject('COMMAND_SERVICE') private readonly commandClient: ClientKafka,
        private commandService: CommandService,
        private productService: ProductService,
        private commandProductService: CommandProductService
    ) {}

    @Get()
    index(): Promise<Command[]> {
        return this.commandService.findAllPopulated();
    }

    @Post('/order')
    async createOrder(@Body() createOrderRequest: CreateOrderRequest): Promise<any> {   
        
        // Objet de la commande a créée
        let commandToCreate = new Command();

        let userAuthId = null;

        // Auth
        if (createOrderRequest.userAuth) {
            userAuthId = createOrderRequest.userAuth.userId;
        }
        commandToCreate.user = userAuthId;

        // Produits 
        let productIds = [];
        // Utiliser pour stocker les quantités par productId, utile pour ensuite get la quantité selon l'id 
        let productQuantities = new Map(); 

        if (createOrderRequest.productsOrder) {
            createOrderRequest.productsOrder.forEach(element => {
                productIds.push(element.productId);
                // Stocker la quantité
                productQuantities.set(element.productId, element.quantity); 
            });
        }

        // Récupération des produits en base de données
        let commandProducts = await this.productService.findCommandProducts(productIds);

        // Ajout de la nouvelle commande en base de données pour récupérer son Id => Utiliser dans commandProduct
        let newCommand = await this.commandService.create(commandToCreate);

        // Tableaux de produits formatté pour le service mailing
        let productsFormatterDtos = [];
        // Prix total de la commande
        let totalPrice = 0;

        commandProducts.forEach(element => {

            let newCommandProduct = new CommandProduct();

            newCommandProduct.product = element;
            newCommandProduct.command = newCommand;

            // On récupère la quantité du produit selon son id
            let quantity = productQuantities.get(element.id);

            if (quantity !== undefined) {

                newCommandProduct.quantity = quantity;

                // Création du DTO pour chaque produit
                let productFormatterDto = new ProductFormatterDto();
                productFormatterDto.productName = element.name;
                productFormatterDto.quantity = quantity;
                productFormatterDto.price = element.price;
    
                productsFormatterDtos.push(productFormatterDto);

                // Calculer le prix total
                totalPrice += element.price * quantity;
            }

            // Ajout d'un commandProduct en base de données
            this.commandProductService.create(newCommandProduct);
        });

        // Formatage du DTO pour le service mailing
        let createProductsFormatterDto = new CreateProductsFormatterDto();
        createProductsFormatterDto.products = productsFormatterDtos;
        createProductsFormatterDto.user = 'Max Machin';
        createProductsFormatterDto.price = new CommandPrice();
        createProductsFormatterDto.price.price = totalPrice;

        this.commandClient.emit(
            'order_created',
            new OrderCreatedEvent(createProductsFormatterDto)
        );

    }

}
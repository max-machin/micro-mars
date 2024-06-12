//Création du controller liée à l'entité product.enity.ts

import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Get()
    index(): Promise<Product[]> {
        return this.productService.findAllPopulated();
    }

    @Get('/gallery')
    async findAll(): Promise<any> {
        const dbProducts = await this.productService.findAllPopulated();
        console.log(dbProducts[0]);
        const products = dbProducts.map(product => {
            return {
                product_id: product.id,
                product_name: product.name,
                price: product.price,
                desc: product.desc,
                category_id: product.category.id,
                category_name: product.category.name,
                exponent_name: product.exponent.name,
                exponent_id: product.exponent.id,
                exponent_picture: product.exponent.exponentAttachments[0].attachment_url,
                product_pictures: product.productAttachments[0].attachment_url,
            }
        });

        return products;
    }

    @Post('create')
    async create(@Body() productData: Product): Promise<any> {
        return this.productService.create(productData);
    }

    @Put(':id/update')
    async update(@Param('id') id, @Body() productData: Product): Promise<any> {
        productData.id = Number(id);
        console.log('Update #' + productData.id)
        return this.productService.update(productData);
    }

    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
        return this.productService.delete(id);
    }
}

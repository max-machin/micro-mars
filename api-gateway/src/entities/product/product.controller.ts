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

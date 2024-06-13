import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  findAllPopulated(): Promise<Product[]> {
    return this.productRepository.find({ relations: ["exponent.exponentAttachments", "category", "productAttachments"] });
  }

  create(productData: Product): Promise<Product> {
    return this.productRepository.save(productData);
  }

  async update(productData: Product): Promise<Product> {
    await this.productRepository.update(productData.id, productData);
    return this.productRepository.findOne({
        where: {
            id: productData.id,
        }});
  }

  delete(id: number): Promise<any> {
    return this.productRepository.delete(id);
  }

  findCommandProducts(arrayId: number[]): Promise<any> {
     return this.productRepository.find({
        where: {
          id: In(arrayId)
        }
     })
  }
}
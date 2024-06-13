import {CreateProductsFormatterDto } from "./order-formatter.dto";

export class OrderCreatedEvent {
  constructor(
    public readonly createProductsFormatterDto: CreateProductsFormatterDto
  ) {}

  toString() {
    console.log('je suis dans levent');
    return JSON.stringify({
      data: this.createProductsFormatterDto 
    });
  }
}
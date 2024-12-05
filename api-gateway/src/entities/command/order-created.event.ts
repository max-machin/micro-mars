import {CreateProductsFormatterDto } from "./order-formatter.dto";

export class OrderCreatedEvent {
  constructor(
    public readonly createProductsFormatterDto: CreateProductsFormatterDto
  ) {}

  toString() {
    return JSON.stringify({
      data: this.createProductsFormatterDto 
    });
  }
}
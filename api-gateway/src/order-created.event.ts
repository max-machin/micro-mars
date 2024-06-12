import { ProductOrderDto, UserAuthDto } from "./create-order-request.dto";

export class OrderCreatedEvent {
  constructor(
    public readonly userAuth: UserAuthDto,
    public readonly productsOrder: ProductOrderDto[]
  ) {}

  toString() {
    return JSON.stringify({
      userAuth: this.userAuth,
      productsOrder: this.productsOrder,
    });
  }
}
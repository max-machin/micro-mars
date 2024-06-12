export class OrderCreatedEvent {
  constructor(
    public readonly userAuth: { userId: number },
    public readonly productsOrder: { productId: number; quantity: number }[]
  ) {}

  toString() {
    return JSON.stringify({
      userAuth: this.userAuth,
      productsOrder: this.productsOrder,
    });
  }
}
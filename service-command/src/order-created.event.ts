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

export class CommandCreatedEvent {
  constructor(
    public readonly products: { productName: string; quantity: number; price: number }[],
    public readonly user: string
  ) {}

  toSring() {
    return JSON.stringify({
      products: this.products,
      user: this.user
    })
  }
}
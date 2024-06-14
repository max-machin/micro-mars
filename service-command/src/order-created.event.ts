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
    public readonly products: { productId: number, productName: string; quantity: number; price: number }[],
    public readonly user: string,
    public readonly price: number,
    public readonly commandId: string
  ) {}

  toSring() {
    return JSON.stringify({
      products: this.products,
      user: this.user,
      price: this.price,
      commandId: this.commandId
    })
  }
}
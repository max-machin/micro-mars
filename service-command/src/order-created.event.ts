/* eslint-disable prettier/prettier */
export class OrderCreatedEvent {
    constructor(
      public readonly orderId: string,
      public readonly userId: string,
      public readonly email: string,
      public readonly price: number,
    ) {}
  
    toString() {
      return JSON.stringify({
        orderId: this.orderId,
        userId: this.userId,
        email: this.email,
        price: this.price,
      });
    }
  }
  
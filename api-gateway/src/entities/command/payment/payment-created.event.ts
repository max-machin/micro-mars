
export class UserFormatterDto {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
}

export class PaymentFormatterDto {
  commandId: string;
  cardNumer: string;
  expMonth: number;
  expYear: number;
  cvc: string;
  amount: number;
  currency: string;
}

export class PaymentCreatedEvent {
  constructor(
    public readonly user: UserFormatterDto,
    public readonly command: PaymentFormatterDto,
  ) {}

  toString() {
    return JSON.stringify({
      user: this.user,
      command: this.command
    });
  }
}





export class UserAuthDto {
    userId: number;
}

export class createPaymentRequest {
    userAuth: UserAuthDto;
    command: {
        commandId: string;
        cardNumer: string;
        expMonth: number;
        expYear: number;
        cvc: string;
        amount: number;
        currency: string;
    }
}
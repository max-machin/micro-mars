export class PaiementFormatterDto {
    email: string;
    name: string;
    amount:  number;
    currency: string;
}

export class OrderUpdatedEvent {
    constructor(
        private readonly paimentFormatterDto: PaiementFormatterDto,
        private readonly commandId: string
    ){}

    toString(){
        return JSON.stringify({
            payment: this.paimentFormatterDto,
            commandId: this.commandId 
        });
    }
}
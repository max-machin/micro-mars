export class IsOrderdeliveredRequest {
    commandId: string
}

export class FindProductsIdEvent {
    constructor(
        private readonly commandId: string
    ){}

    
  toString() {
    return JSON.stringify({
        commandId: this.commandId
    });
  }
}
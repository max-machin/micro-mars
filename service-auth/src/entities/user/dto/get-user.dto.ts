export class GetUserDto {
    readonly userId: number; 
}


export class GetUserEventDto {
    constructor(
        public readonly id: number,
        public readonly email: string,
        public readonly firstname: string,
        public readonly lastname: string,
      ) {}
    
      toSring() {
        return JSON.stringify({
            id: this.id,
            email: this.email,
            firstname: this.firstname,
            lastname: this.lastname
        })
      }
}
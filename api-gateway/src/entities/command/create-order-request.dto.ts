/* eslint-disable prettier/prettier */
export class UserAuthDto {
    userId: number;
}
  
export class ProductOrderDto {
    productId: number;
    quantity: number;
}
  
export class CreateOrderRequest {
    userAuth: UserAuthDto;
    productsOrder: ProductOrderDto[];
}
    
export class CreateCommandDto {
    readonly user: string; 
    readonly commandProduct: ProductFormatterDto[]; 
    readonly status: number
}
  
export class ProductFormatterDto {
    productId: number;
    productName: string;
    quantity: number;
    price: number;
}

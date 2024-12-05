export class ProductFormatterDto {
    productId: number;
    productName: string;
    quantity: number;
    price: number;
}

export class CreateProductsFormatterDto {
    products: ProductFormatterDto[];
    user: string;
}
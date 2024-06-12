export class ProductFormatterDto {
    productName: string;
    quantity: number;
    price: number;
}

export class CommandPrice {
    price: number;
}

export class CreateProductsFormatterDto {
    products: ProductFormatterDto[];
    user: string;
    price: CommandPrice;
}
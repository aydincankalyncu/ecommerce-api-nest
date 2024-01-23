export class CreateProductDto {
    name: string;
    price: number;
    priceWithDiscount?: number;
    stockAmount: number;
    description?: string;
    images: string;
    category: string;
  }
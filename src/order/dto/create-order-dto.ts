export class CreateOrderDto {
    nameSurname: string;
    phoneNumber: string;
    emailAddress: string;
    homeAddress: string;
    billAddress?: string;
    productName: string;
    totalPrice: number;
    productAmount: number;
    confirmationNumber: number;
}
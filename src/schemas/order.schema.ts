import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { OrderStatus } from "src/utils/enums";

export type OrderDocument = HydratedDocument<Order>;

@Schema({timestamps: true})
export class Order {
    @Prop({required: true})
    nameSurname: string

    @Prop({required: true})
    phoneNumber: string

    @Prop({required: true})
    emailAddress: string

    @Prop({required: true})
    homeAddress: string

    @Prop()
    billAddress: string

    @Prop()
    productName: string

    @Prop()
    totalPrice: number

    @Prop()
    productAmount: number

    @Prop()
    confirmationNumber: number

    @Prop({ default: OrderStatus.Pending })
    status: OrderStatus;

    @Prop({default: Date.now})
    createdAt: Date

    @Prop({default: Date.now})
    updatedAt: Date
}

export const OrderSchema = SchemaFactory.createForClass(Order);
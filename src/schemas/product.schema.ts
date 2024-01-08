import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Category } from "./category.schema";
import { HydratedDocument, SchemaType, SchemaTypes } from "mongoose";

export type ProductDocument = HydratedDocument<Product>;

@Schema({timestamps: true})
export class Product {
    @Prop({required: true})
    name: string

    @Prop({required: true})
    price: number

    @Prop()
    priceWithDiscount: number

    @Prop({required: true})
    stockAmount: number

    @Prop()
    description: string

    @Prop({required: true})
    images: string

    @Prop({ type: SchemaTypes.ObjectId, ref: 'Category' }) 
    category: Category

    @Prop({default: Date.now})
    createdAt: Date

    @Prop({default: Date.now})
    updatedAt: Date
}

export const ProductSchema = SchemaFactory.createForClass(Product);
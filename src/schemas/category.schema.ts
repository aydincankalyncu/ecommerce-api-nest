import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CategoryDocument = HydratedDocument<Category>;

@Schema({timestamps: true})
export class Category{
    @Prop({required: true})
    name: string

    @Prop({required: true})
    image: string

    @Prop({default: false})
    isActive: boolean

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
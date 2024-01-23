import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/schemas/order.schema';
import { BaseResult } from 'src/utils/result/base-result';
import { ErrorResult } from 'src/utils/result/error-result';
import { SuccessResult } from 'src/utils/result/success-result';
import { CreateOrderDto } from './dto/create-order-dto';

@Injectable()
export class OrderService {
    constructor(@InjectModel(Order.name) private readonly orderModel: Model<Order>){}

    async getAll() : Promise<BaseResult> {
        try {
            const orders = await this.orderModel.find().exec();
            return new SuccessResult("Success", orders);
        } catch (error) {
            return new ErrorResult("Error occured on getting products", error);
        }
    }

    async createOrder(createOrderdto: CreateOrderDto) : Promise<BaseResult> {
        try {
            createOrderdto.confirmationNumber = this.geneterateConfirmationNumber();
            const newOrder = new this.orderModel(createOrderdto);
            const createdOrder = await newOrder.save();
            return new SuccessResult("Success", createdOrder);
        } catch (error) {
            return new ErrorResult("Error occured on create order", error);
        }
    }

    async deleteOrder(orderId: string) : Promise<BaseResult> {
        try {
            const deletedOrder = await this.orderModel.findByIdAndDelete(orderId);
            return new SuccessResult("Success", deletedOrder);
        } catch (error) {
            return new ErrorResult("Error occured on delete order", error);
        }
    }


    private geneterateConfirmationNumber (): number {
        return Math.floor(100000000 + Math.random() * 900000000);
    }
}

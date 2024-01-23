import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { BaseResult } from 'src/utils/result/base-result';
import { CreateOrderDto } from './dto/create-order-dto';

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService){}

    @Get()
    getAll(): Promise<BaseResult> {
        return this.orderService.getAll();
    }

    @Post()
    craeteOrder(@Body() createOrderDto: CreateOrderDto) : Promise<BaseResult> {
        return this.orderService.createOrder(createOrderDto);
    }

    @Delete(':id')
    deleteOrder(@Param('id') orderId: string) : Promise<BaseResult> {
        return this.orderService.deleteOrder(orderId);
    }
}

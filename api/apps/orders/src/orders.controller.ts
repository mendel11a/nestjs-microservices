import { Res } from '@nestjs/common';
import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Put,
    Delete,
} from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';

import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Post()
    async createOrder(@Res() res, @Body() createOrderInput: CreateOrderInput) {
        try {
            const newOrder = await this.ordersService.create(createOrderInput)
            return res.status(200).json({ message: 'order Created successfully', newOrder })
        } catch (err) {
            return res.status(400).json({
                statusCode: 400,
                message: 'Error: order not created!',
                error: 'Bad Request'
            })
        }
    }

    @Get()
    async getAllorders(@Res() res) {
        try {
            const orders = await this.ordersService.getorders();
            return res.status(200).json({
                message: 'All orders found successfully',
                orders
            });
        } catch (err) {
            return res.status(err.status).json(err.response)
        }
    }

    @Get(':id')
    async getorder(@Res() res, @Param('id') prodId: string) {
        try {
            const order = await this.ordersService.getSingleorder(prodId)
            return res.status(200).json({
                message: 'order found successfully',
                order
            })
        } catch (err) {
            return res.status(err.status).json(err.response)
        }
    }

    @Put(':id')
    async updateorder(@Res() res,
        @Param('id') prodId: string, @Body() CreateOrderInput: {}
    ) {
        try {
            const neworder = await this.ordersService.updateorder(prodId, CreateOrderInput)
            return res.status(200).json({
                message: 'order updated successfully',
                neworder
            })
        } catch (err) {
            res.status(err.status).json(err.response)
        }
    }

    @Delete(':id')
    async removeorder(@Res() res,@Param('id') prodId: string) {
        try {
            const deletedorder= await this.ordersService.deleteorder(prodId);
            return res.status(200).json({
                message:'order deleted successfully',
                deletedorder
            })
        } catch (err) {
            return res.status(err.status).json(err.response)
        }
    }
}
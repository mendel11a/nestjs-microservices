import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PRODUCTS_SERVICE } from './constants/services';
import { CreateOrderInput } from './dto/create-order.input';
import { Order, OrderDocument } from './schema/order.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<OrderDocument>, 
    @Inject(PRODUCTS_SERVICE) private productClient: ClientProxy
  ) { }

  async create(createOrderInput: CreateOrderInput): Promise<Order> {
    const newOrder = new this.orderModel(createOrderInput);
    // const result = await newOrder.save();
    console.log(newOrder);
    this.productClient.send('order_created',newOrder).subscribe()
    return newOrder;
  }

  async getorders(): Promise<Order[]> {
    const orders = await this.orderModel.find()
    return orders
  }

  async getSingleorder(orderId: string): Promise<Order> {
    const order = await this.orderModel.findById(orderId)
    return order
  }

  async updateorder(orderId: string, updateorderInput: {}): Promise<Order> {
    type ObjectMOngo = {
      _doc?: Object
    }
    const order: ObjectMOngo = await this.orderModel.findById(orderId)
    const neworder = { ...order._doc, ...updateorderInput };

    const updatedorder = await this.orderModel.findByIdAndUpdate(orderId,
      { $set: neworder }, { new: true }
    )
    return updatedorder
  }

  async deleteorder(orderId: string): Promise<Order> {
    const deletedorder = await this.orderModel.findByIdAndDelete(orderId)
    return deletedorder
  }
}

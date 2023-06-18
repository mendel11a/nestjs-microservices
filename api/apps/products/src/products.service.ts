import { Injectable, Logger } from '@nestjs/common';
import { RmqContext } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductInput } from './dto/create-product.input';
import { Product, ProductDocument } from './schema/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(createProductInput: CreateProductInput): Promise<Product> {
    const newProduct = new this.productModel(createProductInput);
    const result = await newProduct.save();
    return result;
  }

  async getProducts(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products;
  }

  async getSingleProduct(productId: string): Promise<Product> {
    const product = await this.productModel.findById(productId);
    return product;
  }

  async updateProduct(
    productId: string,
    updateProductInput: {},
  ): Promise<Product> {
    type ObjectMOngo = {
      _doc?: Object;
    };
    const product: ObjectMOngo = await this.productModel.findById(productId);
    const newProduct = { ...product._doc, ...updateProductInput };

    const updatedproduct = await this.productModel.findByIdAndUpdate(
      productId,
      { $set: newProduct },
      { new: true },
    );
    return updatedproduct;
  }

  async deleteProduct(productId: string): Promise<Product> {
    const deletedProduct = await this.productModel.findByIdAndDelete(productId);
    return deletedProduct;
  }

  async updateProducts(data: any, context: RmqContext) {
    type ObjectMOngo = {
      _doc?: { countInStock: number };
    };
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    const productsUpdated: Product[] = [];

    data.products.forEach(async (product: { id: string; quantity: number }) => {
      // update quantity of all prodcuts after being ordered
      const tempProduct: ObjectMOngo = await this.productModel.findById(
        product.id,
      );
      const newProduct = {
        ...tempProduct._doc,
        countInStock: tempProduct._doc.countInStock - product.quantity,
      }; //update quantity

      const updatedproduct = await this.productModel.findByIdAndUpdate(
        product.id,
        { $set: newProduct },
        { new: true },
      );
      productsUpdated.push(updatedproduct);
    });
    console.log('productsUpdated', productsUpdated);
    channel.ack(originalMsg);
  }
}

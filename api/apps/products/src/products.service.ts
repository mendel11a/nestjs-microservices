import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductInput } from './dto/create-product.input';
import { Product, ProductDocument } from './schema/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<ProductDocument>
  ) { }
  private readonly logger = new Logger(ProductsService.name)

  async create(createProductInput: CreateProductInput): Promise<Product> {
    const newProduct = new this.productModel(createProductInput);
    const result = await newProduct.save();
    return result;
  }

  async getProducts(): Promise<Product[]> {
    const products = await this.productModel.find()
    return products
  }

  async getSingleProduct(productId: string): Promise<Product> {
    const product = await this.productModel.findById(productId)
    return product
  }

  async updateProduct(productId: string, updateProductInput: {}): Promise<Product> {
    type ObjectMOngo = {
      _doc?:Object
    }
    const product :ObjectMOngo = await this.productModel.findById(productId)
    const newProduct={...product._doc,...updateProductInput};
    
    const updatedproduct = await this.productModel.findByIdAndUpdate(productId,
      { $set:newProduct  }, { new: true }
    )
    return updatedproduct
  }

  async deleteProduct(productId: string): Promise<Product> {
    const deletedProduct= await this.productModel.findByIdAndDelete(productId)
    return deletedProduct
  }

  async updateProducts(data:any){
    this.logger.log('Billing...', data);
  }
}

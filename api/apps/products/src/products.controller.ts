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
import { CreateProductInput } from './dto/create-product.input';

import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    async createProduct(@Res() res, @Body() createProductInput: CreateProductInput) {
        try {
            const newProduct = await this.productsService.create(createProductInput)
            return res.status(200).json({ message: 'Product Created successfully', newProduct })
        } catch (err) {
            return res.status(400).json({
                statusCode: 400,
                message: 'Error: Product not created!',
                error: 'Bad Request'
            })
        }
    }

    @Get()
    async getAllProducts(@Res() res) {
        try {
            const products = await this.productsService.getProducts();
            return res.status(200).json({
                message: 'All products found successfully',
                products
            });
        } catch (err) {
            return res.status(err.status).json(err.response)
        }
    }

    @Get(':id')
    async getProduct(@Res() res, @Param('id') prodId: string) {
        try {
            const product = await this.productsService.getSingleProduct(prodId)
            return res.status(200).json({
                message: 'Product found successfully',
                product
            })
        } catch (err) {
            return res.status(err.status).json(err.response)
        }
    }

    @Put(':id')
    async updateProduct(@Res() res,
        @Param('id') prodId: string, @Body() createProductInput: {}
    ) {
        try {
            const newProduct = await this.productsService.updateProduct(prodId, createProductInput)
            return res.status(200).json({
                message: 'Product updated successfully',
                newProduct
            })
        } catch (err) {
            res.status(err.status).json(err.response)
        }
    }

    @Delete(':id')
    async removeProduct(@Res() res,@Param('id') prodId: string) {
        try {
            const deletedProduct= await this.productsService.deleteProduct(prodId);
            return res.status(200).json({
                message:'Product deleted successfully',
                deletedProduct
            })
        } catch (err) {
            return res.status(err.status).json(err.response)
        }
    }
}
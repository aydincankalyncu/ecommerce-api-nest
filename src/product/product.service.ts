import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/schemas/product.schema';
import { BaseResult } from 'src/utils/result/base-result';
import { ErrorResult } from 'src/utils/result/error-result';
import { SuccessResult } from 'src/utils/result/success-result';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>){}

    // Get all products
    async getAll(): Promise<BaseResult>{
        try {
            const products = await this.productModel.find().exec();
            return new SuccessResult("Success", products);
        } catch (error) {
            return new ErrorResult("Error occured on getting products", error);
        }
    }

    //Get product by name
    async getProductByName(productName: string) : Promise<BaseResult>{
        try {
            const product = await this.productModel.findOne({name: productName}).exec();
            if(!product){
                return new ErrorResult("There is no product with this name", productName);
            }
            return new SuccessResult("Success", product);
        } catch (error) {
            return new ErrorResult("Error on getting product by name", error);
        }
    }

    // Get product by id
    async getProductById(productId: string) : Promise<BaseResult>{
        try {
            const product = await this.productModel.findById(productId).exec();
            if(!product){
                return new ErrorResult("There is no product with this id", productId);
            }
            return new SuccessResult("Success", product);
        } catch (error) {
            return new ErrorResult("Error on getting product by id", error);
        }
    }

    // Get products by category
    async getProductsByCategory(categoryId: string): Promise<BaseResult> {
        try {
            const products = await this.productModel.find({category: categoryId}).exec();
            return new SuccessResult("Success", products);
        } catch (error) {
            return new ErrorResult("Error occured getting products by category", error);
        }
    }

    //Update product
    async updateProduct(productId: string, updateProductDto: UpdateProductDto): Promise<BaseResult>{
        try {
            const existingProduct = await this.productModel.findById(productId).exec();
            if(!existingProduct){
                return new ErrorResult("There is no product with this id", productId);
            }
            Object.assign(existingProduct, updateProductDto);
            const updatedProduct = await existingProduct.save();
            return new SuccessResult("Success", updatedProduct);
        } catch (error) {
            return new ErrorResult("Error occured while updating product", error);
        }
    }

    //Create product
    async createProduct(createProductDto: CreateProductDto): Promise<BaseResult>{
        try {
            const newProduct = new this.productModel(createProductDto);
            const createdProduct = await newProduct.save();
            return new SuccessResult("Success", createdProduct);
        } catch (error) {
            return new ErrorResult("Error occured on create product", error);
        }
    }
}

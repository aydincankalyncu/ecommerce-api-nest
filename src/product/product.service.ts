import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/schemas/product.schema';
import { BaseResult } from 'src/utils/result/base-result';
import { ErrorResult } from 'src/utils/result/error-result';
import { SuccessResult } from 'src/utils/result/success-result';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { Category } from 'src/schemas/category.schema';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>){}

    // Get all products
    async getAll(): Promise<BaseResult>{
        try {
            const products = await this.productModel.find().populate('category').exec();
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
            const test = await this.productModel.findById(productId).populate('category').exec();
            console.log("Test: ", test);
            const product = await  this.productModel.findById(productId).populate('category').exec();
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
            const products = await this.productModel.find({ category: categoryId }).populate('category').exec();
            return new SuccessResult("Success", products);
        } catch (error) {
            return new ErrorResult("Error occured getting products by category", error);
        }
    }

    //Update product
    async updateProduct(productId: string, files: Express.Multer.File[], updateProductDto: UpdateProductDto): Promise<BaseResult>{
        try {
            const existingProduct = await this.productModel.findById(productId).exec();
            if(!existingProduct){
                return new ErrorResult("There is no product with this id", productId);
            }
            if(files && files.length > 0) {
                const images = files.map((file) => file.buffer.toString('base64')).join(',');
                existingProduct.images = images;
            }
            Object.assign(existingProduct, updateProductDto);
            const updatedProduct = await existingProduct.save();
            return new SuccessResult("Success", updatedProduct);
        } catch (error) {
            return new ErrorResult("Error occured while updating product", error);
        }
    }

    //Create product
    async createProduct(files: Express.Multer.File[], createProductDto: CreateProductDto): Promise<BaseResult>{
        try {
            if(files && files.length > 0){
                const base64Images = files.map((file) => file.buffer.toString('base64'));
                createProductDto.images = base64Images.join(',');
            }
            const newProduct = new this.productModel(createProductDto);
            const createdProduct = await newProduct.save();
            return new SuccessResult("Success", createdProduct);
        } catch (error) {
            return new ErrorResult("Error occured on create product", error);
        }
    }

    //Delete product
    async deleteProduct(id: string) : Promise<BaseResult>{
        try {
            const deletedProduct = await this.productModel.findByIdAndDelete(id);
            return new SuccessResult("Success", deletedProduct);
        } catch (error) {
            return new ErrorResult('Error occured on delete product', error);
        }
    }
}

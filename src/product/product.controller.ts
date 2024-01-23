import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { BaseResult } from 'src/utils/result/base-result';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService){}

    @Get()
    getProducts(): Promise<BaseResult> {
        return this.productService.getAll();
    }

    @Post()
    @UseInterceptors(FilesInterceptor('files', 10))
    async saveProduct(
        @UploadedFiles() files: Express.Multer.File[], 
        @Body() createProductDto: CreateProductDto) : Promise<BaseResult> {
            return this.productService.createProduct(files, createProductDto);
    }

    @Get(":id")
    async getProductById(@Param('id') productId: string) : Promise<BaseResult>{
        return this.productService.getProductById(productId);
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: string) : Promise<BaseResult>{
        return this.productService.deleteProduct(id);
    }

    @Put(':id')
    @UseInterceptors(FilesInterceptor('files', 10))
    async updateProduct(
        @Param('id') productId: string,
        @UploadedFiles() files: Express.Multer.File[],
        @Body() updateProductDto: UpdateProductDto
    ): Promise<BaseResult> {
        return this.productService.updateProduct(productId, files, updateProductDto);
    }

    @Get(':productName')
    async getProductByName(@Param('productName') productName: string) : Promise<BaseResult> {
        return this.productService.getProductByName(productName);
    }

    @Get(':categoryId')
    async getProductByCategoryId(@Param('categoryId') categoryId: string) : Promise<BaseResult> {
        return this.productService.getProductsByCategory(categoryId);
    }

}

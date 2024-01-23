import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { BaseResult } from 'src/utils/result/base-result';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category-dto';
import { UpdateCategoryDto } from './dto/update-category-dto';


@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getCategories(): Promise<BaseResult> {
    return this.categoryService.getCategories();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async saveCategory(
    @UploadedFile() file: Express.Multer.File,
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<BaseResult> {
    return this.categoryService.saveCategory(file, createCategoryDto);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async updateCategory(
    @Param('id') categoryId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<BaseResult> {
    updateCategoryDto.categoryId = categoryId;
    return this.categoryService.updateCategory(file, updateCategoryDto);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string): Promise<BaseResult> {
    return this.categoryService.deleteCategory(id);
  }

  @Get(':id')
  async getCategoryById(@Param('id') categoryId: string): Promise<BaseResult> {
    return this.categoryService.getCategoryById(categoryId);
  }
}

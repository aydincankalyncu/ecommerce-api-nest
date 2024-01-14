import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { BaseResult } from 'src/utils/result/base-result';
import { CategoryService } from './category.service';
import { UpdateCategoryDto } from './dto/update-category-dto';
import { CreateCategoryDto } from './dto/create-category-dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getCategories(): Promise<BaseResult> {
    return this.categoryService.getCategories();
  }

  @Post()
  async saveCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<BaseResult> {
    return this.categoryService.saveCategory(createCategoryDto);
  }

  @Put(':id')
  async updateCategory(
    @Param('id') categoryId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<BaseResult> {
    updateCategoryDto.categoryId = categoryId;
    return this.categoryService.updateCategory(updateCategoryDto);
  }

  @Delete(':name')
  async deleteCategory(@Param('name') name: string): Promise<BaseResult> {
    return this.categoryService.deleteCategory(name);
  }

  @Get(':id')
  async getCategoryById(@Param('id') categoryId: string): Promise<BaseResult> {
    return this.categoryService.getCategoryById(categoryId);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/img',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async uploadCategoryImage(@UploadedFile() file: Express.Multer.File) {
    return {
      statusCode: 200,
      data: file.path,
    };
  }
}

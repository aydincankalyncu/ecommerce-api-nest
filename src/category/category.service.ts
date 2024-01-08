import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/schemas/category.schema';
import { BaseResult } from 'src/utils/result/base-result';
import { ErrorResult } from 'src/utils/result/error-result';
import { SuccessResult } from 'src/utils/result/success-result';
import { CreateCategoryDto } from './dto/create-category-dto';
import { UpdateCategoryDto } from './dto/update-category-dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  async getCategories(): Promise<BaseResult> {
    try {
      const categories = await this.categoryModel.find().exec();
      return new SuccessResult('Success', categories);
    } catch (error) {
      return new ErrorResult('Error occured on getting categories', error);
    }
  }

  async saveCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<BaseResult> {
    const { name, imageUrls } = createCategoryDto;
    const savedCategory = new this.categoryModel({ name, image: imageUrls });
    try {
      savedCategory.save();
      return new SuccessResult(`Category ${name} created`, savedCategory);
    } catch (error) {
      return new ErrorResult('Error occured on create category', error);
    }
  }

  async updateCategory(
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<BaseResult> {
    const { categoryId, categoryName, imageUrls, isActive } = updateCategoryDto;
    try {
      const updatedCategory = await this.categoryModel
        .findById(categoryId)
        .exec();
      if (!updateCategoryDto) {
        return new ErrorResult('There is no category with this id', categoryId);
      }
      if (categoryName) {
        updatedCategory.name = categoryName;
      }
      if (imageUrls) {
        updatedCategory.image = imageUrls;
      }
      if (isActive != null) {
        updatedCategory.isActive = isActive;
      }

      updatedCategory.updatedAt = new Date();

      const updatedCategoryResult = await updatedCategory.save();
      return new SuccessResult('Success', updatedCategoryResult);
    } catch (error) {
      return new ErrorResult('Error occured on updating category', error);
    }
  }

  async deleteCategory(name: string): Promise<BaseResult> {
    try {
      const category = await this.categoryModel.findOne({ name });
      if (!category) {
        return new ErrorResult('There is no category with this name', name);
      }
      await this.categoryModel.deleteOne({ name });
      return new SuccessResult('Success', category);
    } catch (error) {
      return new ErrorResult('Error occured on delete category', error);
    }
  }
}

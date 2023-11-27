import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user-dto';
import * as bcrypt from 'bcrypt';
import { BaseResult } from 'src/utils/result/base-result';
import { SuccessResult } from 'src/utils/result/success-result';
import { ErrorResult } from 'src/utils/result/error-result';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    async create(createUserDto: CreateUserDto): Promise<BaseResult> {
        const { name, password, email } = createUserDto;

        //Hash the password
        const salt = await bcrypt.genSalt();

        const hashedPassword = await bcrypt.hash(password, salt);

        const createdUser = new this.userModel({ name, email, password: hashedPassword });
        try {
            createdUser.save();
            return new SuccessResult(`User ${name} created.`, createdUser);            
        } catch (error) {
            return new ErrorResult("Error occured createuser method. " + error, error);
        }
    }

    async getAll(): Promise<BaseResult> {
        try {
            const result = await this.userModel.find().exec();
            return new SuccessResult('All users fetched', result);
        } catch (error) {
            return new ErrorResult('Error occured getting all users. ' + error, error);
        }
    }
}

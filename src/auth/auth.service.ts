import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { BaseResult } from 'src/utils/result/base-result';
import { ErrorResult } from 'src/utils/result/error-result';
import { SuccessResult } from 'src/utils/result/success-result';
import { CreateUserDto } from './dto/create-user-dto';
import { LoginUserDto } from './dto/login-user-dto';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService) { }

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

    async login(loginUserDto: LoginUserDto) : Promise<BaseResult> {
        const {email} = loginUserDto;
        try {
            const user = await this.userModel.findOne({email: email}).exec();
            if(!user){
                return new ErrorResult(`${email} doesn't exist on the system`, null);
            }
            if (user && (await bcrypt.compare(loginUserDto.password, user.password))) {
                const payload = { id: user._id, email: user.email, username: user.name };
          
                const accessToken = await this.jwtService.signAsync(payload)
                return new SuccessResult("Login successfull", {accessToken: accessToken, user: user, isPasswordMatches: true});
              } else {
                return new ErrorResult("Please check your login credentials", {user: null});
              }
        } catch (error) {
            return new ErrorResult("Error occured on login.", error);
        }
    }
}

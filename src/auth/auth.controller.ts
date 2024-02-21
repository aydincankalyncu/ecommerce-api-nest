import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user-dto';
import { BaseResult } from 'src/utils/result/base-result';
import { LoginUserDto } from './dto/login-user-dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('/signup')
    signUp(@Body() createUserDto: CreateUserDto): Promise<BaseResult> {
        return this.authService.create(createUserDto);
    }

    @Post('/signin')
    signIn(@Body() loginUserDto: LoginUserDto): Promise<BaseResult>{
        return this.authService.login(loginUserDto);
    }

    @UseGuards(AuthGuard)
    @Get('test')
    getTest(@Request() req) {
        return req.user;
    }
}

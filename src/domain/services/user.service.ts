import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDTO, LoginUserDTO, UserResponse } from "../../application/dto/user.dto";
import { Users } from "../entities/user.entity";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt/dist";


@Injectable()
export class UserService{
    constructor(
        @InjectModel(Users)
        private userModel: typeof Users,
        private jwtService: JwtService,
    ){}
    async generateToken(payload){
        const accessTokens = this.jwtService.sign({payload})
        return {accessTokens}
    }

    
    async signUpUser(createUserDTO: CreateUserDTO): Promise<UserResponse>{
        const {name, email, password} = createUserDTO
        const existingUser = await this.userModel.findOne({ where: { email } });

        if (existingUser) {
            throw new HttpException('Email is already in use', HttpStatus.BAD_REQUEST);
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.userModel.create({
            email,
            password: hashedPassword,
            name,
        });

        return user;
    }

    async signInUser(loginUserDTO: LoginUserDTO){
        const { email, password } = loginUserDTO
        const user = await this.userModel.findOne({where: {email}})
        if (!user) {
            throw new UnauthorizedException("Email not registered")
        }

        const passwordMatch =  await bcrypt.compare(password, user.password)
        if(!passwordMatch){
            throw new UnauthorizedException("Wrong password")
        }
        const payload = {
            sub: user.id,
            email: user.email
        }
        return this.generateToken(payload)
    }
    
}
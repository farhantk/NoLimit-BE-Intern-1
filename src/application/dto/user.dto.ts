import {  IsEmail, IsString, Length } from 'class-validator';

export type UserResponse = {
    id: number;
    name: string;
    email: string;
}

export class CreateUserDTO {
    @IsString()
    @Length(5, 100, { message: "Name must more than 5 character"})
    name: string;

    @IsEmail({}, { message: "Email must be a valid email address"})
    @IsString()
    email: string;

    @IsString()
    @Length(8, 100, { message: "Password must more than 8 character"})
    password: string;
}

export class LoginUserDTO {
    @IsEmail({}, { message: "Email must be a valid email address"})
    @IsString()
    email: string;

    @IsString()
    password: string;
}
import { Body, Controller, Get, HttpCode, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { NotLoggedInGuard } from "../../domain/guards/local.guard";
import { UserService } from "../../domain/services/user.service";
import { WebResponse } from "../../insfrasctructure/common/web.model";
import { CreateUserDTO, LoginUserDTO, UserResponse } from "../dto/user.dto";

@Controller('')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {} 
  
  @HttpCode(201)
  @UseGuards(NotLoggedInGuard)
  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signUpUser(
    @Body() request: CreateUserDTO
  ): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.signUpUser(request);
    return {
      data: result,
    };
  }

  @HttpCode(200)
  @UseGuards(NotLoggedInGuard)
  @UsePipes(new ValidationPipe())
  @Post('signin')
  async signInUser(
    @Body() request: LoginUserDTO
  ){
    const result = await this.userService.signInUser(request)
    return {
      data: result,
    };
  }

}

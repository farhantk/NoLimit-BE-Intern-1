import { Controller, Get, Post, UseGuards, Request, Body, Param, Delete, Put, ValidationPipe, UsePipes, HttpCode } from "@nestjs/common";
import { AuthGuard } from "../../domain/guards/user.guard";
import { PostService } from "../../domain/services/post.service";
import { WebResponse } from "../../insfrasctructure/common/web.model";
import { CreatePostDTO, PostResponse, UpdatePostDTO } from "../dto/post.dto";


@Controller('post')
export class PostController{
    constructor(
        private readonly postService: PostService
    ){}
    

    @HttpCode(201)
    @UseGuards(AuthGuard)
    @Post('create')
    @UsePipes(new ValidationPipe())
    async createPost(
        @Body() request: any,
        @Request() req: Request 
    ): Promise<WebResponse<PostResponse>> {
        console.log(req['user'].payload.sub)
        const { content } = request;
        const createPostRequest: CreatePostDTO = {
            content: content,
            authorId: req['user'].payload.sub, 
        };
        const result = await this.postService.createPost(createPostRequest);
        return {
            data: result
        }
    }

    @HttpCode(200)
    @Get('')
    async getAllPost(
    ): Promise<WebResponse<PostResponse[]>> {
        const result = await this.postService.getAllPost();
        return {
            data: result
        }
    }
    @HttpCode(200)
    @Get(':id')
    async getPostByID(@Param('id') id: number): Promise<PostResponse> {
        return await this.postService.getPostByID(id);
    }

    @HttpCode(204)
    @UseGuards(AuthGuard)
    @Delete(':id')
    async deletePostByID(@Param('id') id: number, @Request() req: Request ): Promise<PostResponse[]> {
        const authorId = req['user'].payload.sub
        return await this.postService.deletePostByID(id, authorId);
    }

    @HttpCode(201)
    @UseGuards(AuthGuard)
    @Put(':id')
    @UsePipes(new ValidationPipe())
    async updatePostByID(
        @Param('id') id: number, 
        @Body() updatePostDto: UpdatePostDTO, 
        @Request() req: any
    ): Promise<PostResponse> {
        const authorId = req['user'].payload.sub
        return await this.postService.updatePostByID(id, updatePostDto, authorId);
    }
}



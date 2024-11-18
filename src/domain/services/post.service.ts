import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators";
import { InjectModel } from "@nestjs/sequelize";
import { CreatePostDTO, PostResponse, UpdatePostDTO } from "../../application/dto/post.dto";
import { Posts } from "../entities/post.entity";
import { Users } from "../entities/user.entity";

@Injectable()
export class PostService {
    constructor(
        @InjectModel(Posts)
        private postModel: typeof Posts
    ){}

    async createPost(createPost: CreatePostDTO):Promise<PostResponse>{
        const post = await this.postModel.create(createPost as Partial<Posts>)
        return post
    }
    async getAllPost(): Promise<PostResponse[]> {
        const posts = await this.postModel.findAll({
            include: [{
                model: Users,
                as: 'author',
            }],
        });
        return posts;
    }
    async getPostByID(id: number): Promise<PostResponse> {
        const post = await this.postModel.findOne({
            where: { id }, 
            include: [{
                model: Users,
                as: 'author',
            }],
        });
    
        if (!post) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }
        return post
    }
    async deletePostByID(id: number, authorId: number): Promise<PostResponse[]> {
        const post = await this.postModel.findOne({
            where: { id },
        });
    
        if (!post) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }
        if (post.authorId !== authorId) {  
            throw new ForbiddenException('You are not authorized to delete this post');
        }
        await post.destroy(); 
        return this.getAllPost()
    }
    async updatePostByID(id:number, updatePostDTO: UpdatePostDTO, authorId: number): Promise<PostResponse> {
        const post = await this.postModel.findOne({
            where: { id },
        });
    
        if (!post) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }
        if (post.authorId !== authorId) {
            throw new ForbiddenException('You are not authorized to update this post');
        }
    
        post.content = updatePostDTO.content;
        await post.save();
    
        return this.getPostByID(id)
    }
}
import { IsInt, IsNotEmpty, IsString, Length } from "class-validator"

export type PostResponse = {
    id: number
    content: string
    createdAt?: Date
    updatedAt?: Date
    authorId: number

}

export class CreatePostDTO {

    @IsString()
    @IsNotEmpty({ message: "Content must not be empty" })
    @Length(1, 500, { message: "Content must be between 1 and 500 characters" })
    content: string;
  

    @IsInt({ message: "Author ID must be an integer" })
    authorId: number;
  }

export class UpdatePostDTO {
    @IsString()
    @IsNotEmpty({ message: "Content must not be empty" })
    @Length(1, 500, { message: "Content must be between 1 and 500 characters" })
    content: string;
  }
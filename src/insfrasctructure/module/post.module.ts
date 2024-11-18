import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostController } from '../../application/controllers/post.controller';
import { Posts } from '../../domain/entities/post.entity';
import { PostService } from '../../domain/services/post.service';

@Module({
  imports: [SequelizeModule.forFeature([Posts])],
  controllers: [PostController],
  providers: [PostService],
  exports: [SequelizeModule],
})
export class PostModule {}

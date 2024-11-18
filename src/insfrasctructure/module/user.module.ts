import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from '../../application/controllers/user.controller';
import { Users } from '../../domain/entities/user.entity';
import { UserService } from '../../domain/services/user.service';

@Module({
  imports: [SequelizeModule.forFeature([Users])],
  controllers: [UserController],
  providers: [UserService],
  exports: [SequelizeModule],
})
export class UserModule {}

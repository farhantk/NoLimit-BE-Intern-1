import { Module } from '@nestjs/common';
import { AppController } from '../../application/controllers/app.controller';
import { AppService } from '../../domain/services/app.service';
import { UserModule } from './user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostModule } from './post.module';
import { Users } from '../..//domain/entities/user.entity';
import { Posts } from '../../domain/entities/post.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dbConfig from '../../../config/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [dbConfig],
      isGlobal: true
    }),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    SequelizeModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get('database');
        return {
          dialect: dbConfig.dialect,
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.name,
          models: [Users, Posts],
        };
      },
      inject: [ConfigService], 
    }),
    UserModule,
    PostModule
  ],

  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}

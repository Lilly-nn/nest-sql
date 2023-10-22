import { Module } from "@nestjs/common";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./post.entity";
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";

@Module({
  controllers: [PostController],
  providers: [PostService, UserService],
  imports: [TypeOrmModule.forFeature([Post, User])],
})
export class PostModule {}

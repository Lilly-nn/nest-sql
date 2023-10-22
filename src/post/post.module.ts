import { Module } from "@nestjs/common";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./post.entity";
import { User } from "src/user/user.entity";

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [TypeOrmModule.forFeature([Post, User])],
})
export class PostModule {}

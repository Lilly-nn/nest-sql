import { Controller, Body, Post } from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostDto } from "./post.dto";

@Controller("posts")
export class PostController {
  constructor(private postService: PostService) {}
  @Post("/create")
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }
}

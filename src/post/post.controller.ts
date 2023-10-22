import { Controller, Body, Get, Post, Delete, Param, ParseIntPipe } from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostDto } from "./post.dto";
import { UserService } from "src/user/user.service";

@Controller("posts")
export class PostController {
  constructor(
    private postService: PostService,
    private userService: UserService,
  ) {}
  @Get()
  getPosts() {
    return this.postService.findPosts();
  }

  @Get("/:id")
  getPost(@Param("id", ParseIntPipe) id: number) {
    return this.postService.findPost(id);
  }

  @Post("/create")
  async createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }

  @Delete("/:id")
  deletePost(@Param("id", ParseIntPipe) id: number) {
    return this.postService.deletePost(id);
  }
}

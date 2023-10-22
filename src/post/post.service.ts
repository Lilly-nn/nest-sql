import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { CreatePostDto } from "./post.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "./post.entity";
import { Repository } from "typeorm";
import { User } from "src/user/user.entity";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findPosts() {
    return this.postsRepository.find({ relations: ["user"] });
  }

  async findPost(id: number) {
    const post = await this.findPostById(id);
    return post;
  }

  async createPost(postDto: CreatePostDto) {
    const { userId } = postDto;
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new HttpException("Such user doesn't exist", HttpStatus.NOT_FOUND);
    }
    const newPost = this.postsRepository.create({ ...postDto, createdAt: new Date(), user });
    return this.postsRepository.save(newPost);
  }

  async deletePost(id: number) {
    await this.findPostById(id);
    await this.postsRepository.delete({ id });
  }

  private async findPostById(id: number) {
    const post = await this.postsRepository.findOneBy({ id });
    if (!post) {
      throw new HttpException("Such post doesn't exist", HttpStatus.NOT_FOUND);
    }
    return post;
  }
}

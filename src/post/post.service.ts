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

  async createPost(postDto: CreatePostDto) {
    const { userId } = postDto;
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new HttpException("Such user doesn't exist", HttpStatus.NOT_FOUND);
    }
    const newPost = this.postsRepository.create({ ...postDto, createdAt: new Date(), user });
    return this.postsRepository.save(newPost);
  }
}

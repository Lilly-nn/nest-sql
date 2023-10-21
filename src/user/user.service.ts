import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { UserType } from "./user.type";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return users;
  }

  createUser(userInfo: UserType): Promise<User> {
    const newUser = this.usersRepository.create({ ...userInfo, createdAt: new Date() });
    return this.usersRepository.save(newUser);
  }

  async updateUser(userId: number, updateDetails: UserType) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new HttpException("Such user doesn't exist", HttpStatus.NOT_FOUND);
    }
    await this.usersRepository.update({ id: userId }, { ...updateDetails });
  }
}

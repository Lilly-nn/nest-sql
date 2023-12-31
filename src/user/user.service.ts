import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { UserType } from "./user.type";
import * as bcrypt from "bcrypt";
import { UserDto } from "./user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    const users = await this.usersRepository.find({ relations: ["posts"] });
    return users;
  }

  async createUser(userInfo: UserDto): Promise<User> {
    const { password, confirmPassword } = userInfo;
    if (password !== confirmPassword) {
      throw new HttpException("Passwords do not match", HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await bcrypt.hash(password, 6);
    const secureUserInfo = {
      ...userInfo,
      password: hashedPassword,
    };
    const newUser = this.usersRepository.create({ ...secureUserInfo, createdAt: new Date() });
    return this.usersRepository.save(newUser);
  }

  async updateUser(userId: number, updateDetails: UserType) {
    await this.findUser(userId);
    await this.usersRepository.update({ id: userId }, { ...updateDetails });
  }

  async deleteUser(userId: number) {
    await this.findUser(userId);
    await this.usersRepository.delete({ id: userId });
  }

  async findUser(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException("Such user doesn't exist", HttpStatus.NOT_FOUND);
    }
    return user;
  }
}

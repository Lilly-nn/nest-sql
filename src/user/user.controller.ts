import { Controller, Get, Post, Body } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./user.dto";

@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  async getUsers() {
    const users = await this.userService.getAllUsers();
    return users;
  }

  @Post("/create")
  async createUser(@Body() userDto: UserDto) {
    const { confirmPassword, ...userInfo } = userDto;
    if (confirmPassword) {
    }
    const user = await this.userService.createUser(userInfo);
    return user;
  }
}

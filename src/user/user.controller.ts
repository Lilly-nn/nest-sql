import { Controller, Get, Post, Body, Patch, Delete, Param, ParseIntPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { UpdateUserDto, UserDto } from "./user.dto";

@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getUsers() {
    return this.userService.getAllUsers();
  }

  @Post("/create")
  async createUser(@Body() userDto: UserDto) {
    const { confirmPassword, ...userInfo } = userDto;
    if (!confirmPassword) return;
    const user = await this.userService.createUser(userInfo);
    return user;
  }

  @Patch("/:id")
  async updateUser(@Param("id", ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    await this.userService.updateUser(id, updateUserDto);
  }

  @Delete("/:id")
  async deleteUser(@Param("id", ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
  }
}

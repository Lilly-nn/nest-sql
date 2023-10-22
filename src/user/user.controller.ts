import { Controller, Get, Post, Body, Patch, Delete, Param, ParseIntPipe, UsePipes, ValidationPipe } from "@nestjs/common";
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
  @UsePipes(new ValidationPipe())
  async createUser(@Body() userDto: UserDto) {
    const user = await this.userService.createUser(userDto);
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

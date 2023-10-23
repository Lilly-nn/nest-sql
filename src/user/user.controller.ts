import { Controller, Get, Post, Body, Patch, Delete, Param, ParseIntPipe, UsePipes, ValidationPipe, UseInterceptors, ClassSerializerInterceptor } from "@nestjs/common";
import { UserService } from "./user.service";
import { UpdateUserDto, UserDto } from "./user.dto";
import { SerializedUser } from "./user.type";

@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async getUsers() {
    const users = await this.userService.getAllUsers();
    return users.map(user => new SerializedUser(user));
  }

  @Post("/create")
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe())
  async createUser(@Body() userDto: UserDto) {
    const user = await this.userService.createUser(userDto);
    return new SerializedUser(user);
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

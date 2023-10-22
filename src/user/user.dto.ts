import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class UserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @MinLength(6)
  confirmPassword: string;
}

export class UpdateUserDto {
  email: string;
  password: string;
}

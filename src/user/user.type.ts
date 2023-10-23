import { Exclude } from "class-transformer";
import { User } from "./user.entity";

export class UserType {
  email: string;
  password: string;
}

export class SerializedUser {
  email: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

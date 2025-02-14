import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class userDtoLogin {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

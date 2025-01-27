import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { EUserStatus } from '../enum/status.enum';

export class CreatUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
//   @IsPhoneNumber()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(EUserStatus)
  type: EUserStatus;
}

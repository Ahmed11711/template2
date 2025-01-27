import {
    IsEmail,
    IsEnum,
    IsOptional,   
    IsPhoneNumber,
    IsString,
  } from 'class-validator';
  import { EUserStatus } from '../enum/status.enum';
  
  export class UpdateUserDto {
    @IsString()
    @IsOptional()  
    username?: string;
  
    @IsString()
    @IsOptional()
    @IsEmail()
    email?: string;
  
    @IsString()
    @IsOptional()
    password?: string;
  
    @IsString()
    @IsOptional()
     phone?: string;
  
    @IsString()
    @IsOptional()   
    @IsEnum(EUserStatus)
    type?: EUserStatus;
  }
  
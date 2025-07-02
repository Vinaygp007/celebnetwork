import { IsEmail, IsNotEmpty, MinLength, IsEnum, IsOptional, IsString, Matches } from 'class-validator';
import { UserRole } from '../enums/user-role.enum';

export class RegisterDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'Password must contain at least one lowercase letter, one uppercase letter, and one number'
  })
  password: string;

  @IsEnum(UserRole, { message: 'Role must be either fan, celebrity, or admin' })
  @IsOptional()
  role?: UserRole = UserRole.FAN;

  @IsString({ message: 'First name must be a string' })
  @IsNotEmpty({ message: 'First name is required' })
  firstName: string;

  @IsString({ message: 'Last name must be a string' })
  @IsNotEmpty({ message: 'Last name is required' })
  lastName: string;

  @IsOptional()
  dateOfBirth?: Date;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  stageName?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  industries?: string[];
}

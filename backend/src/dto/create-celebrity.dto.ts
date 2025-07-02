import { IsString, IsNotEmpty, IsOptional, IsArray, IsUrl, IsNumber, Min } from 'class-validator';

export class CreateCelebrityDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsOptional()
  stageName?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsArray()
  @IsString({ each: true })
  industries: string[];

  @IsOptional()
  socialHandles?: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
    spotify?: string;
    imdb?: string;
  };

  @IsNumber()
  @Min(1000)
  @IsOptional()
  estimatedFanbase?: number;

  @IsUrl()
  @IsOptional()
  avatar?: string;

  @IsUrl()
  @IsOptional()
  coverPhoto?: string;
}

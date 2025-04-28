import { IsString } from 'class-validator';

export class UpsertUserInfoRequestDto {
  @IsString()
  dateOfBirth: string;

  @IsString()
  gender: string;

  @IsString()
  profession: string;

  @IsString()
  style: string;
}

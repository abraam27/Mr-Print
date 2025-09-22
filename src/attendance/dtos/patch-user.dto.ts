import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-attendance.dto';

export class PatchUserDto extends PartialType(
  OmitType(CreateUserDto, ['email'] as const),
) {}

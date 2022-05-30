import { PartialType } from '@nestjs/swagger';
import { CreateProfileGameDto } from './create-profile_game.dto';

export class UpdateProfileGameDto extends PartialType(CreateProfileGameDto) {
  Profile?: string[];
  Games?: string[];
}

import { PartialType } from '@nestjs/mapped-types';

import { CreateGeneroDto } from './create-genero.dto';

export class UpdateGeneroDto extends PartialType(CreateGeneroDto) {
  Name: string;
}

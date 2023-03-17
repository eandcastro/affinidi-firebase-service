import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class PayloadData {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  msg: string
}

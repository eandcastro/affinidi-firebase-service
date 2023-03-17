import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class PayloadNotification {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  body: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  title: string
}

import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator'
import { Payload } from './payload.dto'

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  fcmToken: string

  @IsNotEmpty()
  @ValidateNested()
  @ApiProperty({ required: true })
  @Type(() => Payload)
  payload: Payload
}

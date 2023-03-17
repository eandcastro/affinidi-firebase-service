import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNotEmpty, ValidateNested } from 'class-validator'
import { PayloadData } from './payload-data.dto'
import { PayloadNotification } from './payload-notification.dto'

export class Payload {
  @IsNotEmpty()
  @ValidateNested()
  @ApiProperty({ required: true })
  @Type(() => PayloadData)
  data: PayloadData

  @IsNotEmpty()
  @ValidateNested()
  @ApiProperty({ required: true })
  @Type(() => PayloadNotification)
  notification: PayloadNotification
}

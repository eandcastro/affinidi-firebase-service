import { ApiProperty } from '@nestjs/swagger'
import { STRING, SUCCESS } from '../../../constants/constants'

export class CreateNotificationOutputDto {
  @ApiProperty({ required: true, type: STRING, example: SUCCESS })
  readonly message: string
}

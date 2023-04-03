import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class PayloadData {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'NOTIFY_USER_FOR_BOOKING_HEALTH_SCREENING' })
  notificationType: string

  @IsOptional()
  @ApiProperty({
    example: {
      appointmentDate: 'optional',
      paymentDate: 'optional',
      reportId: 'optional',
      bookingId: 'optional',
    },
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  notificationMetadata: Record<string, any>
}

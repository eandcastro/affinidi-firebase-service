import { Controller, Post, Body, HttpCode } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateNotificationOutputDto } from './dto/create-notification-output.dto'
import { CreateNotificationDto } from './dto/create-notification.dto'
import { NotificationService } from './notification.service'

@ApiTags('push-notification')
@Controller('push-notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @HttpCode(202)
  @ApiOperation({ summary: 'Send Push Notification to FPH App' })
  @ApiResponse({ status: 202, type: CreateNotificationOutputDto, isArray: false })
  async create(
    @Body() createNotificationDto: CreateNotificationDto,
  ): Promise<CreateNotificationOutputDto> {
    return this.notificationService.create(createNotificationDto)
  }
}

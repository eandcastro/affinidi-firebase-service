import { Injectable, Logger } from '@nestjs/common'
import { CreateNotificationOutputDto } from './dto/create-notification-output.dto'
import { CreateNotificationDto } from './dto/create-notification.dto'
import { SUCCESS } from '../../constants/constants'
import { FirebaseService } from '../firebase/firebase.service'

@Injectable()
export class NotificationService {
  constructor(private readonly logger: Logger, private readonly firebaseService: FirebaseService) {}

  async create(createNotificationDto: CreateNotificationDto): Promise<CreateNotificationOutputDto> {
    try {
      if (this.firebaseService.appInitialization) {
        this.logger.log(`Send Notification: ${JSON.stringify(createNotificationDto)}`, {
          method: 'sendPushNotification',
        })
        await this.firebaseService.sendPushNotification(
          createNotificationDto.fcmToken,
          createNotificationDto.payload,
        )
      }
    } catch (error) {
      this.logger.error('Error sending push notification', {
        errorMessage: JSON.stringify(error),
      })
    } finally {
      // eslint-disable-next-line no-unsafe-finally
      return { message: SUCCESS }
    }
  }
}

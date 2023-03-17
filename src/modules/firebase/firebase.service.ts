import { Inject, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import admin from 'firebase-admin'
// eslint-disable-next-line import/no-unresolved
import { MessagingDeviceResult } from 'firebase-admin/messaging'
import { PushNotificationPayload } from '../notification/types/notification.types'

export class FirebaseService {
  constructor(
    private readonly logger: Logger,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: this.configService.get('firebaseConfig.projectId'),
          clientEmail: this.configService.get('firebaseConfig.clientEmail'),
          privateKey: this.configService.get('firebaseConfig.privateKey'),
        }),
        databaseURL: this.configService.get('firebaseConfig.firebaseDatabaseUrl'),
      })
    } catch (error) {
      this.logger.error('Error initializing firebase app', {
        errorMessage: error,
      })
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  appInitialization = () => {
    admin.appCheck()
  }

  sendPushNotification = async (
    fcmToken: string | string[],
    payload: PushNotificationPayload,
  ): Promise<string[]> => {
    try {
      const response = await admin.messaging().sendToDevice(fcmToken, payload, {
        // Required for background/quit data-only messages on iOS
        contentAvailable: true,
        // Required for background/quit data-only messages on Android
        priority: 'high',
      })

      this.logger.log(`Sent to device: ${JSON.stringify(response)}`)
      const messageIds: string[] = []
      response.results.forEach((result: MessagingDeviceResult) => {
        if (result?.messageId) {
          messageIds.push(result?.messageId)
        } else {
          this.logger.error(result?.error)
        }
      })

      this.logger.log('Sent push notification', messageIds)
      return messageIds
    } catch (error) {
      this.logger.error('Unable to send push notification', {
        errorMessage: JSON.stringify(error),
      })
      return []
    }
  }
}

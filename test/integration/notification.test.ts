import { Test } from '@nestjs/testing'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { NotificationService } from '../../src/modules/notification/notification.service'
import { FirebaseModule } from '../../src/modules/firebase/firebase.module'
import { NotificationController } from '../../src/modules/notification/notification.controller'
import { LoggingModule } from '../../src/modules/logging/logging.module'

describe('Notification Controller', () => {
  let app: NestFastifyApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [NotificationController],
      providers: [NotificationService],
      imports: [FirebaseModule, LoggingModule],
    }).compile()

    app = moduleRef.createNestApplication<NestFastifyApplication>(new FastifyAdapter())
    await app.init()
    await app.getHttpAdapter().getInstance().ready()
  })

  it('should send push notification', async () => {
    const notificationPayload = {
      fcmToken:
        'cQUsPNtZL0exm7r2CxuCQ7:APA91bHRqFcpxy5Xm_zHBREIreWUAj7Wk5XOa1yafXVzvLkouJIS58VHZZ_9N-397efF5hkdpbTzHJJU-DKJxnf1OMxTSojCO-z8cQtLVdPzB4i2TtDUW_dDCP6SEe0QgOkneEXh_tID',
      payload: {
        data: {
          msg: 'FPH App Notification',
        },
        notification: {
          title: 'FPH Notification',
          body: 'You have received a VC',
        },
      },
    }
    return app
      .inject()
      .post('/push-notification')
      .body(notificationPayload)
      .then((response) => {
        expect(JSON.parse(response.body).message).toEqual('Success')
        expect(response.statusCode).toEqual(202)
      })
      .catch((response) => {
        expect(response.statusCode).toEqual(202)
      })
  })

  afterEach(async () => {
    await app.close()
  })
})

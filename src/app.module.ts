import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import configuration from './config/configuration'
import { FirebaseModule } from './modules/firebase/firebase.module'
import { HealthModule } from './modules/health/health.module'
import { LoggingModule } from './modules/logging/logging.module'
import { NotificationModule } from './modules/notification/notification.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      // Set ignoreEnvFile to false when running locally
      ignoreEnvFile: true,
      load: [configuration],
      isGlobal: true,
    }),
    LoggingModule,
    HealthModule,
    NotificationModule,
    FirebaseModule,
  ],
  providers: [ConfigService],
})
export class AppModule {}

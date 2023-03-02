/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import configuration from './config/configuration'
import { HealthModule } from './health.module'
import { LoggingModule } from './logging.module'
import { AppController } from './controllers/app.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      load: [configuration],
      isGlobal: true,
    }),
    LoggingModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [ConfigService],
})
export class AppModule {}

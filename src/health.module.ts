/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'
import { HealthController } from './controllers/health.controller'

@Module({
  controllers: [HealthController],
  imports: [TerminusModule],
})
export class HealthModule {}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Global, Logger, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { WinstonModule } from 'nest-winston'

@Global()
@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('log.options'),
    }),
  ],
  providers: [Logger],
  exports: [Logger],
})
export class LoggingModule {}

import { Global, Logger, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { WinstonModule } from 'nest-winston'
import configuration from '../../config/configuration'

@Global()
@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('log.options'),
    }),
    ConfigModule.forRoot({
      // Set ignoreEnvFile to false when running locally
      ignoreEnvFile: true,
      load: [configuration],
      isGlobal: true,
    }),
  ],
  providers: [Logger],
  exports: [Logger],
})
export class LoggingModule {}

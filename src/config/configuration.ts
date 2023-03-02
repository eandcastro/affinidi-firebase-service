import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import winston, { LoggerOptions } from 'winston'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default () => ({
  host: process.env.HOST || 'localhost',
  port: parseInt(process.env.PORT, 10) || 3000,
  log: {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    options: {
      level: process.env.LOG_LEVEL ?? 'info',
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
      defaultMeta: { serviceName: 'firebase-service', projectName: 'firebase-service' },
      transports: [
        new winston.transports.Console({
          handleExceptions: true,
        }),
      ],
    } as LoggerOptions,
    provider: WINSTON_MODULE_NEST_PROVIDER,
  },
})

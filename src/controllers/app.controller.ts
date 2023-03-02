/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Inject, Logger, LoggerService } from '@nestjs/common'

@Controller()
export class AppController {
  constructor(@Inject(Logger) private readonly logger: LoggerService) {}

  @Get()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getHello() {}
}

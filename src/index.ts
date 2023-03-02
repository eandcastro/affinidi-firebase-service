import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import configuration from './config/configuration'

async function bootstrap() {
  const config = configuration()

  try {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
      bufferLogs: true,
    })

    app.useLogger(app.get(config.log.provider))
    app.useGlobalPipes(new ValidationPipe())

    const swagger = new DocumentBuilder()
      .setTitle('firebase-service')
      .setDescription('firebase-service API description')
      .setVersion('1.0')
      .addTag('Public')
      .build()

    const document = SwaggerModule.createDocument(app, swagger)
    SwaggerModule.setup('api-docs', app, document)

    await app.listen(config.port, '0.0.0.0')
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log({ error: e.toString() })
    process.exitCode = 1
  }
}

bootstrap()

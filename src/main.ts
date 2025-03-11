import { ShutdownSignal, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import helmet from 'helmet'
import { json } from 'body-parser'
import { AppModule } from 'modules/app'
import { getConfig } from 'lib/config'

const bootstrap = async () => {
    const { expressConfig, bodyParserConfig, corsConfig } = getConfig().basicConfig
    const { port, host } = expressConfig

    const app = await NestFactory.create<NestExpressApplication>(AppModule)

    app.use(
        helmet({
            noSniff: true,
            hidePoweredBy: true,
            contentSecurityPolicy: false,
            crossOriginEmbedderPolicy: false,
        }),
    )

    app.enableCors(corsConfig)
    app.use(json(bodyParserConfig))
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
    app.enableShutdownHooks([ShutdownSignal.SIGINT, ShutdownSignal.SIGTERM])

    await app.listen(port, host)
}

bootstrap()

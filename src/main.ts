import { ShutdownSignal, ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { NestFactory } from '@nestjs/core'
import helmet from 'helmet'
import { json } from 'body-parser'
import { splitCorsOrigin, getConfig } from 'lib/config'
import { AppModule } from 'modules/app'

const bootstrap = async () => {
    const { expressConfig, bodyParserConfig, corsConfig } = getConfig().basicConfig
    const { port, host } = expressConfig
    const { origin, methods, credentials } = corsConfig

    const app = await NestFactory.create<NestExpressApplication>(AppModule)

    app.use(
        helmet({
            noSniff: true,
            hidePoweredBy: true,
            contentSecurityPolicy: false,
            crossOriginEmbedderPolicy: false,
        }),
    )
    app.enableCors({
        origin: splitCorsOrigin(origin),
        methods,
        credentials,
    })
    app.use(json(bodyParserConfig))
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
    app.enableShutdownHooks([ShutdownSignal.SIGINT, ShutdownSignal.SIGTERM])

    await app.listen(port, host)
}

bootstrap()

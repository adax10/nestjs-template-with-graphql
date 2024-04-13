import { EnvironmentVariables } from './environment.variables'
import { HttpMethods } from 'lib/common'

export const basicConfig = (configEnvs: EnvironmentVariables) => ({
    expressConfig: {
        port: configEnvs.API_PORT,
        host: configEnvs.API_HOST
    },
    corsConfig: {
        origin: configEnvs.CORS_ALLOWED_ORIGINS,
        methods: [HttpMethods.PUT, HttpMethods.GET, HttpMethods.PATCH, HttpMethods.POST, HttpMethods.OPTIONS]
    },
    throttlerConfig: {
        ttlS: configEnvs.THROTTLER_TTL_S,
        limit: configEnvs.THROTTLER_LIMIT
    },
    bodyParserConfig: {
        limit: configEnvs.MAX_FILE_SIZE_KB
    }
})

import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerModule, seconds } from '@nestjs/throttler'
import { ConfigModule } from '@nestjs/config'
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from '@apollo/server/plugin/landingPage/default'
import { join } from 'node:path'
import { GqlThrottlerGuard } from 'lib/guards'
import { getConfig, envValidation } from 'lib/config'
import { HealthCheckModule } from 'modules/health-check'
import { AppService } from './app.service'
import { ExampleModule } from 'modules/example'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validate: envValidation,
            validationOptions: {
                allowUnknown: true,
                abortEarly: true,
            },
        }),
        ThrottlerModule.forRoot({
            throttlers: [
                {
                    ttl: seconds(getConfig().basicConfig.throttlerConfig.ttlS),
                    limit: getConfig().basicConfig.throttlerConfig.limit,
                },
            ],
        }),
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
            driver: ApolloDriver,
            useFactory: () => ({
                debug: false,
                cache: 'bounded',
                autoSchemaFile: join(process.cwd(), 'schema.gql'),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                context: ({ req, res }: { req: any; res: any }) => ({ req, res }),
                playground: false,
                plugins: [
                    getConfig().graphQLConfig.usePlayground
                        ? ApolloServerPluginLandingPageLocalDefault({ footer: false })
                        : ApolloServerPluginLandingPageProductionDefault({ footer: false }),
                ],
            }),
        }),
        HealthCheckModule,
        ExampleModule,
    ],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: GqlThrottlerGuard,
        },
    ],
})
export class AppModule {}

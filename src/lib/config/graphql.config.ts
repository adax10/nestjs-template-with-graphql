import { toBoolean } from 'lib/utils'
import { EnvironmentVariables } from './environment.variables'

export const graphQLConfig = (configEnvs: EnvironmentVariables) => ({
    usePlayground: toBoolean(configEnvs.USE_GQL_PLAYGROUND)
})

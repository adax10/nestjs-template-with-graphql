import http, { Response } from 'k6/http'
import exec from 'k6/execution'
import { sleep } from 'k6'
import { MODULE } from './constants.ts'
import { GraphqlResponse, RequestOptions, TextRefinedResponse } from './types.ts'

const validateParameters = (module?: string) => {
    if (module && module !== '' && !MODULE.includes(module)) {
        throw new Error('Invalid module name')
    }
}

export const createScenarioKey = (module: string) => {
    validateParameters(module)

    if (module === '' || !module) {
        return 'all-tests'
    }

    return `${module}`
}

export const extractQueryNameFromGroup = () => {
    const group = exec.vu.metrics.tags.group
    const query = group.toString().split('::').at(2)

    return query ?? ''
}

export const getTokenFromCookie = (response: Response, accessTokenCookieName: string): string | undefined => {
    if (Object.keys(response.cookies).length === 0) {
        return undefined
    }

    return response.cookies ? response.cookies[accessTokenCookieName].at(0)?.value : undefined
}

export const getCookieNameFromUrl = (url: string): string => {
    const cookiePrefix = 'pgds-auth'

    if (url.includes('integration')) {
        return `${cookiePrefix}-integration`
    }

    if (url.includes('staging')) {
        return `${cookiePrefix}-staging`
    }

    return `${cookiePrefix}-production`
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const test = (name: string, callback: (name: string) => any) => {
    const useInfoLogs = __ENV.USE_INFO_LOGS

    if (useInfoLogs === 'true') {
        // eslint-disable-next-line no-console
        console.log(`Executing ${extractQueryNameFromGroup()} - '${name}'`)
    }

    const result = callback(name)
    sleep(1)

    return result
}

export const executeAndParseGraphqlRequest = <K extends string, T>(
    url: string,
    payload: string,
    requestOptions: RequestOptions,
): GraphqlResponse<K, T> => {
    const response: TextRefinedResponse = http.post(url, payload, requestOptions)

    return JSON.parse(response.body) as GraphqlResponse<K, T>
}

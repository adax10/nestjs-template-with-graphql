import { RefinedParams, RefinedResponse } from 'k6/http'

export type SetUpParameters = {
    requestUrl: string
    module: string
}

export type GraphqlResponse<K extends string, T> = {
    data: {
        [P in K]: T
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors?: Array<any>
}

export type TextRefinedResponse = RefinedResponse<'text'>
export type RequestOptions = RefinedParams<'text'>

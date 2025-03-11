import { check, group } from 'k6'
import http from 'k6/http'
import { TextRefinedResponse } from '../../types.ts'
import { test, executeAndParseGraphqlRequest } from '../../utils.ts'
import { executeBasicChecks, validate } from '../../validation-utils.ts'
import { getCountriesQuery } from './queries.ts'
import { Country } from './types.ts'

export const getCountries = () => {
    const url = 'https://countries.trevorblades.com/'

    const groupName = getCountries.name
    const headers = {
        'Content-Type': 'application/json',
    }
    const requestOptions = {
        headers,
        tags: {
            name: groupName,
        },
    }

    return group(groupName, () => {
        test(`response is status 200 and response body doesn't contain errors`, () => {
            const payload = JSON.stringify(
                getCountriesQuery({
                    name: 'Singapore',
                }),
            )
            const response: TextRefinedResponse = http.post(url, payload, requestOptions)

            check(response, executeBasicChecks())
        })

        test('should return data for searched country name', testName => {
            const name = 'Singapore'
            const payload = JSON.stringify(
                getCountriesQuery({
                    name,
                }),
            )

            const response = executeAndParseGraphqlRequest<'countries', Array<Country>>(url, payload, requestOptions)
            const result = response.data.countries

            check(result, {
                [testName]: (result: Array<Country>) => {
                    const conditions = [validate(result).toNotHaveLength(0), result.every(item => validate(item.name).toEqual(name))]

                    return conditions.every(Boolean)
                },
            })
        })
    })
}

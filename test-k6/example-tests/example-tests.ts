import { group } from 'k6'
import { getCountries } from './graphql-api-tests/index.ts'

export const exampleTests = () => {
    group('exampleTests with GraphQL API', () => {
        getCountries()
    })
}

import { Injectable } from '@nestjs/common'
import { GetExampleInput } from './input'

@Injectable()
export class ExampleService {
    getExample(input: GetExampleInput) {
        const { exampleName } = input

        return exampleName
    }
}

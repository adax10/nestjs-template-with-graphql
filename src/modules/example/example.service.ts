import { Injectable } from '@nestjs/common'
import { GetExampleInput } from './dto'

@Injectable()
export class ExampleService {
    getExample(dto: GetExampleInput) {
        const { exampleName } = dto

        return exampleName
    }
}

import { Args, Query, Resolver } from '@nestjs/graphql'
import { ExampleService } from './example.service'
import { GetExampleInput } from './dto'

@Resolver()
export class ExampleResolver {
    constructor(private exampleService: ExampleService) {}

    @Query(() => String)
    getExample(@Args(GetExampleInput.name) dto: GetExampleInput) {
        return this.exampleService.getExample(dto)
    }
}

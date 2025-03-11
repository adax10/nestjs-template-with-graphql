import { Args, Query, Resolver } from '@nestjs/graphql'
import { ExampleService } from './example.service'
import { GetExampleInput } from './input'

@Resolver()
export class ExampleResolver {
    constructor(private exampleService: ExampleService) {}

    @Query(() => String)
    getExample(@Args(GetExampleInput.name) input: GetExampleInput) {
        return this.exampleService.getExample(input)
    }
}

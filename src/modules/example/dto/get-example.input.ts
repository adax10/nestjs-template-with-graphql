import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class GetExampleInput {
    @Field()
    @IsString()
    @IsNotEmpty()
    exampleName: string
}

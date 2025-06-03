import {InputValues, IUseCase, OutputValues} from "./IUseCase";

export abstract class UseCase<I extends InputValues, O extends OutputValues> implements IUseCase<I, O>{
    abstract execute(input: I): Promise<O>
}
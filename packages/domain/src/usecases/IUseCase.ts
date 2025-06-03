export interface IUseCase<I extends InputValues, O extends OutputValues> {
     execute(input: I) : Promise<O>;
}

export interface InputValues{}
export interface OutputValues{}
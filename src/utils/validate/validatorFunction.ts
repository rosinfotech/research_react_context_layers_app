import type { IValidatorConfigInternal, IValidatorFunctionOptions } from "./types";

export const validatorFunction = <I extends object>( options: IValidatorFunctionOptions & IValidatorConfigInternal<I> ): string | true => {
    const { test, ...rest } = options;

    return test( rest );
};

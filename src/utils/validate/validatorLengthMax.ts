import { replaceMessage } from "./helpers";
import type { IValidatorConfigInternal, IValidatorLengthMaxOptions } from "./types";

export const validatorLengthMax = <I extends object>(
    options: IValidatorLengthMaxOptions & IValidatorConfigInternal<I>,
): string | true => {
    const { message, name, test, value } = options;

    if ( String( value ).length > Number( test ) ) {
        return replaceMessage( {
            __NAME__ : name,
            __TEST__ : test,
            __VALUE__: value,
            message  : !!message ? message : `Length of "__NAME__" too big. Expected __TEST__`,
        } );
    }

    return true;
};

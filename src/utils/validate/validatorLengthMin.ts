import { replaceMessage } from "./helpers";
import type { IValidatorConfigInternal, IValidatorLengthMinOptions } from "./types";

export const validatorLengthMin = <I extends object>(
    options: IValidatorLengthMinOptions & IValidatorConfigInternal<I>,
): string | true => {
    const { message, name, test, value } = options;

    if ( String( value ).length < Number( test ) ) {
        return replaceMessage( {
            __NAME__ : name,
            __TEST__ : test,
            __VALUE__: value,
            message  : !!message ? message : `Length of "__NAME__" too small. Expected __TEST__`,
        } );
    }

    return true;
};

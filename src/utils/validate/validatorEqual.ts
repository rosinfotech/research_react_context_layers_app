import { replaceMessage } from "./helpers";
import type { IValidatorConfigInternal, IValidatorEqualOptions } from "./types";

export const validatorEqual = <I extends object>(
    options: IValidatorEqualOptions & IValidatorConfigInternal<I>,
): string | true => {
    const {
        message,
        name,
        test: { name: testName, value: testValue },
        value,
    } = options;

    if ( testValue !== value ) {
        return replaceMessage( {
            __NAME__: name,
            message : !!message ? message : `"__NAME__" and "${ testName }" should be equal`,
        } );
    }

    return true;
};

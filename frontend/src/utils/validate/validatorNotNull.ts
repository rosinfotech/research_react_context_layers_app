import { isNull } from "@rosinfo.tech/utils";
import { replaceMessage } from "./helpers";
import type { IValidatorConfigInternal, IValidatorNotNullOptions } from "./types";

export const validatorNotNull = <I extends object>(
    options: IValidatorNotNullOptions & IValidatorConfigInternal<I>,
): string | true => {
    const { message, name, test, value } = options;

    if ( isNull( value ) ) {
        return replaceMessage( {
            __NAME__ : name,
            __TEST__ : test,
            __VALUE__: value,
            message  : !!message ? message : `"__NAME__" is null`,
        } );
    }

    return true;
};

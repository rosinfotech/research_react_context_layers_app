import { replaceMessage } from "./helpers";
import type { IValidatorConfigInternal, IValidatorRegExpOptions } from "./types";

export const validatorRegExp = <I extends object>( options: IValidatorRegExpOptions & IValidatorConfigInternal<I> ): string | true => {
    const { message, name, test, value } = options;

    if ( !test.test( value ?? "" ) ) {
        return replaceMessage( {
            __NAME__ : name,
            __TEST__ : test,
            __VALUE__: value,
            message  : !!message ? message : `"__NAME__" should equal to ${ test.toString() }`,
        } );
    }

    return true;
};

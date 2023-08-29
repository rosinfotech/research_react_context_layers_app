import { replaceMessage } from "./helpers";
import type { IValidatorConfigInternal, IValidatorRequiredOptions } from "./types";

export const validatorRequired = <I extends object>( options: IValidatorRequiredOptions & IValidatorConfigInternal<I> ): string | true => {
    const { message, name, test, value } = options;

    if ( !value && !String( value ) ) {
        return replaceMessage( {
            __NAME__ : String( name ).trim(),
            __TEST__ : String( test ).trim(),
            __VALUE__: String( value ).trim(),
            message  : !!message ? message : `"__NAME__" is required`,
        } );
    }

    return true;
};

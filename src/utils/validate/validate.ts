import { ErrorCode, isObject, isString } from "@rosinfo.tech/utils";
import { isObjectPlain } from "@utils/isObjectPlain";
import { validatorMap } from "./constants";
import type {
    Entries,
    Full,
    IValidateOptions,
    TValidateReturn,
    TValidatorMap,
    TValidatorsMapValues,
} from "./types";

export const validate = <I extends object>( options: IValidateOptions<I> ): TValidateReturn<I> => {
    const { scheme, values } = options;

    const errorsEntries = [];

    for ( const [ key, value ] of Object.entries( values ) as Entries<I> ) {
        if ( !key || !isObject( scheme ) || !( key in scheme ) || !scheme[ key ] ) {
            continue;
        }

        for ( const [ validatorName, validatorTestRaw ] of Object.entries(
            ( scheme as Full<IValidateOptions<I>["scheme"]> )[ key ],
        ) as Entries<Full<TValidatorsMapValues<I>>> ) {
            const validator = ( validatorMap as TValidatorMap<I> )[ validatorName ];

            if ( !validator ) {
                throw new ErrorCode( "2908231201", `Validator <${ validatorName }> is undefined` );
            }

            let validatorOptions;

            if ( isObjectPlain( validatorTestRaw ) ) {
                validatorOptions = validatorTestRaw;
            } else {
                validatorOptions = {
                    test: validatorTestRaw,
                };
            }

            validatorOptions = {
                ...validatorOptions,
                ...{
                    name: key,
                    value,
                },
            };

            const validatorResult = validator( validatorOptions );

            if ( isString( validatorResult ) ) {
                errorsEntries.push( [ key, validatorResult ] );
            }
        }
    }

    if ( !!errorsEntries.length ) {
        return Object.fromEntries( errorsEntries );
    }

    return true;
};

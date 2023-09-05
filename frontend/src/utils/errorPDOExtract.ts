import { isError, isString } from "@rosinfo.tech/utils";

export interface IErrorPDO {
    message?: string;
    stack?: string;
}

export const errorPDOExtract = ( value: unknown ) => {
    let message;
    let stack;

    if ( isString( value ) ) {
        return {
            message: value,
            stack,
        };
    }

    if ( isError( value ) ) {
        return {
            message: value.message,
            stack  : value.stack,
        };
    }

    if ( value instanceof ErrorEvent ) {
        return {
            message: value.message,
            stack  : value.error.stack,
        };
    }

    return {
        message,
        stack,
    };
};

import { ErrorCode, isObject } from "@rosinfo.tech/utils";

export const GET_SET_SEPARATE = ".";

export const set = <R extends { [k: string]: any }>(
    ref: R | null | undefined,
    path: string,
    value: any,
) => {
    const pathArray = path.split( GET_SET_SEPARATE );

    for ( let i = 0; i < pathArray.length - 1; i++ ) {
        const pathElement = pathArray[ i ];

        if ( !isObject( ref ) ) {
            throw new ErrorCode( "0209231938" );
        }

        if ( !( pathElement in ref ) ) {
            throw new ErrorCode( "0209231929" );
        }

        ref = ref[ pathElement ];
    }

    const pathElement = pathArray[ pathArray.length - 1 ];

    if ( !isObject( ref ) ) {
        throw new ErrorCode( "0209232120" );
    }

    if ( !( pathElement in ref ) ) {
        throw new ErrorCode( "0209232121" );
    }

    // @ts-expect-error TS is working bad
    ref[ pathElement ] = value;

    return true;
};

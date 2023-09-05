import { ErrorCode, isObject } from "@rosinfo.tech/utils";
import { GET_SET_SEPARATE } from "./set";

export const get = <R extends { [k: string]: any }>( ref: R, path: string ) => {
    const pathArray = path.split( GET_SET_SEPARATE );

    for ( const pathElement of pathArray ) {
        if ( !isObject( ref ) ) {
            throw new ErrorCode( "0209231939" );
        }
        if ( !( pathElement in ref ) ) {
            throw new ErrorCode( "0209231930" );
        }
        ref = ref[ pathElement ];
    }

    return ref;
};

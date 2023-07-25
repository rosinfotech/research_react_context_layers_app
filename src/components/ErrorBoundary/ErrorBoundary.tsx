import { useCallback, useEffect, useState } from "react";
import { ErrorBoundaryInner } from "./ErrorBoundaryInner";
import type { FC, PropsWithChildren } from "react";

export const ErrorBoundary: FC<PropsWithChildren> = ( props ) => {
    const { children } = props;

    const [ , errorSet ] = useState<unknown>();
    const [ , infoSet ] = useState<unknown>();

    const errorInfoSet = useCallback( ( error: unknown, info?: unknown ) => {
        errorSet( error );
        infoSet( info );
    }, [] );

    useEffect( () => {
        const handlePromiseRejectionEvent = ( event: PromiseRejectionEvent ): void => {
            if ( !event.reason ) {
            }
            errorInfoSet( event.reason );
        };

        window.addEventListener( "error", errorInfoSet );
        window.addEventListener( "unhandledrejection", handlePromiseRejectionEvent );

        return (): void => {
            window.removeEventListener( "error", errorInfoSet );
            window.removeEventListener( "unhandledrejection", handlePromiseRejectionEvent );
        };
    }, [ errorInfoSet ] );

    return (
        <ErrorBoundaryInner onError={ errorInfoSet } >
            {children}
        </ErrorBoundaryInner>
    );
};

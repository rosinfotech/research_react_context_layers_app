import { useCallback, useEffect, useState } from "react";
import { ErrorBoundaryFailBack } from "./ErrorBoundaryFailBack";
import { ErrorBoundaryInner } from "./ErrorBoundaryInner";
import type { IErrorBoundaryFailBackProps } from "./ErrorBoundaryFailBack";
import type { FC, PropsWithChildren } from "react";

interface IErrorBoundaryProps extends PropsWithChildren {
    ReactElementErrorBoundaryFailBack?: FC<IErrorBoundaryFailBackProps>;
}

export const ErrorBoundary: FC<IErrorBoundaryProps> = ( props ) => {
    const { ReactElementErrorBoundaryFailBack = ErrorBoundaryFailBack, children } = props;

    const [ error, errorSet ] = useState<unknown>();
    const [ info, infoSet ] = useState<unknown>();

    const errorInfoSet = useCallback( ( error: unknown, info?: unknown ) => {
        errorSet( error );
        infoSet( info );
    }, [] );

    useEffect( () => {
        const handlePromiseRejectionEvent = ( event: PromiseRejectionEvent ): void => {
            if ( !event.reason ) {
                return;
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

    if ( !!error ) {
        return <ReactElementErrorBoundaryFailBack error={ error } info={ info } />;
    }

    return <ErrorBoundaryInner onError={ errorInfoSet }>{children}</ErrorBoundaryInner>;
};

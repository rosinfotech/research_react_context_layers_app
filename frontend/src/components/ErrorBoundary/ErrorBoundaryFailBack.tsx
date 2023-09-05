import { isObject } from "@rosinfo.tech/utils";
import { errorPDOExtract } from "@utils/errorPDOExtract";
import type { CSSProperties, FC } from "react";

export interface IErrorBoundaryFailBackProps {
    error?: unknown;
    info?: unknown;
}

const styleDefault: CSSProperties = {
    padding: 10,
};

const stylePreDefault: CSSProperties = {
    ...styleDefault,
    fontSize  : 16,
    whiteSpace: "break-spaces",
};

export const ErrorBoundaryFailBack: FC<IErrorBoundaryFailBackProps> = ( props ) => {
    const { error, info } = props;

    const errorPDO = errorPDOExtract( error );

    console.log( "info" );
    console.log( info );

    return (
        <div
            style={ {
                alignItems     : "center",
                backgroundColor: "blue",
                color          : "white",
                display        : "inline-flex",
                flexDirection  : "column",
                height         : "100%",
                justifyContent : "center",
                padding        : 10,
                width          : "100%",
            } }
        >
            <h1 style={ styleDefault }>Error</h1>
            {!!errorPDO.message && <h2 style={ styleDefault }>{String( errorPDO.message )}</h2>}
            {!!errorPDO.stack && (
                <pre style={ stylePreDefault }>
                    {String( ( ( errorPDO.stack ?? "" ) as string ).replace( /\\n/g, "\n" ) )}
                </pre>
            )}
            {isObject( info )
                && <pre style={ stylePreDefault }>{JSON.stringify( info ).replace( /\\n/g, "\n" )}</pre>}
            {!isObject( info ) && !!info && <h2 style={ styleDefault }>{String( info )}</h2>}
        </div>
    );
};

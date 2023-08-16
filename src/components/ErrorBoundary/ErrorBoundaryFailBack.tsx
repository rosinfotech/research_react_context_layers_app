import { isError, isObject } from "@rosinfo.tech/utils";
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
            {isError( error ) ? (
                <>
                    <h2 style={ styleDefault }>{String( error.stack )}</h2>
                    <pre style={ stylePreDefault }>{error.message.replace( /\\n/g, "\n" )}</pre>
                </>
            )
                : <h2 style={ styleDefault }>{String( error )}</h2>}
            {isObject( info )
                ? <pre style={ stylePreDefault }>{JSON.stringify( info ).replace( /\\n/g, "\n" )}</pre>
                : <h2 style={ styleDefault }>{String( info )}</h2>}
        </div>
    );
};

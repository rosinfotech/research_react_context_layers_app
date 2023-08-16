import { Component } from "react";
import type { PropsWithChildren } from "react";

interface IErrorBoundaryInnerState {
    error: unknown;
    info: unknown;
}

interface IErrorBoundaryInnerProps {
    onError: ( error: unknown, info?: unknown ) => void;
}

export class ErrorBoundaryInner extends Component<
PropsWithChildren<IErrorBoundaryInnerProps>,
IErrorBoundaryInnerState
> {

    constructor ( props: IErrorBoundaryInnerProps ) {
        super( props );
        this.state = {
            error: null,
            info : null,
        };
    }

    public static getDerivedStateFromError ( error: unknown ) {
        return { error };
    }

    public componentDidCatch ( error: unknown, info: unknown ) {
        this.props.onError( error, info );
    }

    public render () {
        if ( !!this.state.error ) {
            return null;
        }

        return this.props.children;
    }

}

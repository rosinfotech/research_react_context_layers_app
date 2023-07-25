import { useCallback, useMemo, useState } from "react";
import { createContext, useContext, useContextSelector } from "use-context-selector";
import type { IContextStateProviderState, IContextStateValue } from "./types";
import type { FC, PropsWithChildren } from "react";

const initialState: IContextStateProviderState = {
    state1: 0,
    state2: 0,
    state3: 0,
};

const contextStateStateSetDefault = ( stateUpdate: Partial<IContextStateProviderState> ) => {
    throw new Error(
        `contextStateStateSet is undefined. stateUpdate is <${ JSON.stringify( stateUpdate ) }>`,
    );
};

export const ContextState = createContext<IContextStateValue>( {
    ...initialState,
    contextStateStateSet: contextStateStateSetDefault,
} );

export function useContextState (): IContextStateValue {
    return useContext( ContextState );
}

export function useContextStateSelector<Selected> (
    selector: ( state: IContextStateValue ) => Selected,
): Selected {
    return useContextSelector( ContextState, selector );
}

export const ContextStateProvider: FC<PropsWithChildren> = ( { children } ) => {
    const [ state, setState ] = useState<IContextStateProviderState>( initialState );

    const contextStateStateSet = useCallback( ( stateUpdate: Partial<IContextStateProviderState> ) => {
        console.log( `contextStateStateSet <${ JSON.stringify( stateUpdate ) }>` );
        setState( prevState => ( {
            ...prevState,
            ...stateUpdate,
        } ) );
    }, [] );

    const value = useMemo<IContextStateValue>( () => {
        const valueNew = {
            ...state,
            contextStateStateSet,
        };
        return valueNew;
    }, [ contextStateStateSet, state ] );

    return <ContextState.Provider value={ value }>{children}</ContextState.Provider>;
};

import { createContext, useContext, useMemo } from "react";
import type { IContextEnvironmentProviderState, TContextEnvironmentValue } from "./types";
import type { FC, PropsWithChildren } from "react";

const initialState: IContextEnvironmentProviderState = {};

export const ContextEnvironment = createContext<TContextEnvironmentValue>( {
    ...initialState,
} );

export function useContextEnvironment (): TContextEnvironmentValue {
    return useContext( ContextEnvironment );
}

export const ContextEnvironmentProvider: FC<PropsWithChildren> = ( { children } ) => {
    const value = useMemo<TContextEnvironmentValue>( () => {
        const valueNew = {
            ...initialState,
        };
        return valueNew;
    }, [] );

    return <ContextEnvironment.Provider value={ value }>{children}</ContextEnvironment.Provider>;
};

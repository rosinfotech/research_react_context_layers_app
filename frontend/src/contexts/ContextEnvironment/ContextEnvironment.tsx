import { createContext, useContext, useMemo } from "react";
import type { IContextEnvironmentProviderState, TContextEnvironmentValue } from "./types";
import type { FC, PropsWithChildren } from "react";

const contextEnvironmentInitialState: IContextEnvironmentProviderState = {};

const contextEnvironmentInitialValue: TContextEnvironmentValue = {
    ...contextEnvironmentInitialState,
};

export const ContextEnvironment = createContext<TContextEnvironmentValue>(
    contextEnvironmentInitialValue,
);

export function useContextEnvironment (): TContextEnvironmentValue {
    return useContext( ContextEnvironment );
}

export const ContextEnvironmentProvider: FC<PropsWithChildren> = ( { children } ) => {
    const value = useMemo<TContextEnvironmentValue>( () => contextEnvironmentInitialValue, [] );

    return <ContextEnvironment.Provider value={ value }>{children}</ContextEnvironment.Provider>;
};

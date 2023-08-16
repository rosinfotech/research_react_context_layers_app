import { createContext, useContext, useMemo } from "react";
import type { IContextServicesProviderState, TContextServicesValue } from "./types";
import type { FC, PropsWithChildren } from "react";

const contextServicesInitialState: IContextServicesProviderState = {};

const contextServicesInitialValue: IContextServicesProviderState = {
    ...contextServicesInitialState,
};

export const ContextServices = createContext<TContextServicesValue>( contextServicesInitialValue );

export function useContextServices (): TContextServicesValue {
    return useContext( ContextServices );
}

export const ContextServicesProvider: FC<PropsWithChildren> = ( { children } ) => {
    const value = useMemo<TContextServicesValue>( () => contextServicesInitialValue, [] );

    return <ContextServices.Provider value={ value }>{children}</ContextServices.Provider>;
};

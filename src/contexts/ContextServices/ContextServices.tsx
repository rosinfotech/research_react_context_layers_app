import { useContextAPI } from "@contexts/ContextAPI";
import { stateFacade } from "@contexts/ContextState";
import { createContext, useContext } from "react";
import { ServiceUI } from "./services/ServiceUI";
import type { IContextServicesProviderState, TContextServicesValue } from "./types";
import type { FC, PropsWithChildren } from "react";

const contextServicesInitialState: IContextServicesProviderState = {
    serviceUI: new ServiceUI(),
};

const contextServicesInitialValue: IContextServicesProviderState = {
    ...contextServicesInitialState,
};

export const ContextServices = createContext<TContextServicesValue>( contextServicesInitialValue );

export function useContextServices (): TContextServicesValue {
    return useContext( ContextServices );
}

export const ContextServicesProvider: FC<PropsWithChildren> = ( { children } ) => {
    const { api } = useContextAPI();

    if ( !api ) {
        return null;
    }

    const { serviceUI } = contextServicesInitialValue;

    serviceUI.api = api;
    serviceUI.stateFacade = stateFacade;

    return (
        <ContextServices.Provider value={ contextServicesInitialValue }>
            {children}
        </ContextServices.Provider>
    );
};

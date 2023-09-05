import { createContext, useContext } from "react";
import { ServiceUI } from "./services/ServiceUI";
import type { IContextServicesProviderState, TContextServicesValue } from "./types";

const contextServicesInitialState: IContextServicesProviderState = {
    serviceUI: new ServiceUI(),
};

export const contextServicesInitialValue: IContextServicesProviderState = {
    ...contextServicesInitialState,
};

export const ContextServices = createContext<TContextServicesValue>( contextServicesInitialValue );

export function useContextServices (): TContextServicesValue {
    return useContext( ContextServices );
}

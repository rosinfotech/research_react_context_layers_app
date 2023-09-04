import { useContextAPI } from "@contexts/ContextAPI";
import { stateFacade } from "@contexts/ContextState";
import { ContextServices, contextServicesInitialValue } from "./ContextServices";
import { ContextServicesInit } from "./ContextServicesInit";
import type { FC, PropsWithChildren } from "react";

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
            <ContextServicesInit />
            {children}
        </ContextServices.Provider>
    );
};

import { ErrorCode } from "@rosinfo.tech/utils";
import axios from "axios";
import { createContext, useContext, useMemo } from "react";
import type { IContextAPIProviderState, IContextAPIValue } from "./types";
import type { FC, PropsWithChildren } from "react";

const baseUrl = !!process.env.APPLICATION_MOCKAPI_IO_BASE_URL
    ? process.env.APPLICATION_MOCKAPI_IO_BASE_URL
    : ( () => {
        throw new ErrorCode( "1608231401" );
    } )();

const contextAPIInitialState: IContextAPIProviderState = {
    baseUrl,
};

export const api = axios.create( {
    baseURL: contextAPIInitialState.baseUrl,
} );

const contextAPIInitialValue: IContextAPIValue = {
    ...contextAPIInitialState,
    api,
};

export const ContextAPI = createContext<IContextAPIValue>( contextAPIInitialValue );

export function useContextAPI (): IContextAPIValue {
    return useContext( ContextAPI );
}

export const ContextAPIProvider: FC<PropsWithChildren> = ( { children } ) => {
    const value = useMemo<IContextAPIValue>( () => {
        const valueNew = {
            ...contextAPIInitialState,
            api,
        };
        return valueNew;
    }, [] );

    if ( !value.api ) {
        return null;
    }

    return <ContextAPI.Provider value={ value }>{children}</ContextAPI.Provider>;
};

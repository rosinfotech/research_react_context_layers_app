import axios from "axios";
import { createContext, useContext, useMemo } from "react";
import type { IContextAPIProviderState, IContextAPIValue } from "./types";
import type { FC, PropsWithChildren } from "react";

const initialState: IContextAPIProviderState = {
    baseUrl: "",
};

const api = axios.create( {
    baseURL: initialState.baseUrl,
} );

export const ContextAPI = createContext<IContextAPIValue>( {
    ...initialState,
    api,
} );

export function useContextAPI (): IContextAPIValue {
    return useContext( ContextAPI );
}

export const ContextAPIProvider: FC<PropsWithChildren> = ( { children } ) => {
    const value = useMemo<IContextAPIValue>( () => {
        const valueNew = {
            ...initialState,
            api,
        };
        return valueNew;
    }, [] );

    return <ContextAPI.Provider value={ value }>{children}</ContextAPI.Provider>;
};

import { useCallback, useMemo, useRef, useState } from "react";
import { createContext, useContext, useContextSelector } from "use-context-selector";
import { ContextStateFacade } from "./ContextStateFacade";
import type { IContextStateProviderState, IContextStateValue } from "./types";
import type { FC, PropsWithChildren } from "react";

export const contextStateFacade = new ContextStateFacade();

const contextStateInitialState: IContextStateProviderState = {
    repositoryUsers: null,
};

const contextStateInitialValue: IContextStateValue = {
    contextStateFacade,
    data   : contextStateInitialState,
    dataGet: null,
    dataSet: null,
};

export const ContextState = createContext<IContextStateValue>( contextStateInitialValue );

export function useContextState (): IContextStateValue {
    return useContext( ContextState );
}

export function useContextStateSelector<Selected> (
    selector: ( state: IContextStateValue ) => Selected,
): Selected {
    return useContextSelector( ContextState, selector );
}

export const ContextStateProvider: FC<PropsWithChildren> = ( { children } ) => {
    const [ data, dataSetEffect ] = useState<IContextStateProviderState>( contextStateInitialState );
    const dataRef = useRef( data );
    const dataGet = useCallback( () => dataRef.current, [] );

    const dataSet = useCallback( ( dataNext: Partial<IContextStateProviderState> ) => {
        dataSetEffect( ( dataPrev ) => {
            const dataUpdated = {
                ...dataPrev,
                ...dataNext,
            };
            dataRef.current = dataUpdated;
            return dataUpdated;
        } );
    }, [] );

    contextStateFacade.dataGet = dataGet;

    contextStateFacade.dataSet = dataSet;

    const value = useMemo<IContextStateValue>( () => {
        const valueNew = {
            contextStateFacade,
            data,
            dataGet,
            dataSet,
        };
        return valueNew;
    }, [ data, dataGet, dataSet ] );

    return <ContextState.Provider value={ value }>{children}</ContextState.Provider>;
};

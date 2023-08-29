import { objectClone } from "@rosinfo.tech/utils";
import { useCallback, useMemo, useRef, useState } from "react";
import { createContext, useContext, useContextSelector } from "use-context-selector";
import { ContextStateFacade } from "./ContextStateFacade";
import type { IContextStateData, IContextStateValue } from "./types";
import type { FC, PropsWithChildren } from "react";

export const stateFacade = new ContextStateFacade();

const contextStateInitialState: IContextStateData = {
    forms: {
        userCreate: null,
    },
    repositories: {
        users: null,
    },
};

const contextStateInitialValue: IContextStateValue = {
    data   : contextStateInitialState,
    dataGet: null,
    dataSet: null,
    stateFacade,
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
    const [ data, dataSetEffect ] = useState<IContextStateData>( contextStateInitialState );
    const dataRef = useRef( data );
    const dataGet = useCallback( () => dataRef.current, [] );

    const dataSet = useCallback( ( dataNext: Partial<IContextStateData> ) => {
        dataSetEffect( ( dataPrev ) => {
            const dataUpdated = {
                ...dataPrev,
                ...dataNext,
            };
            dataRef.current = dataUpdated;

            console.log( `ContextStateProvider` );
            console.log( `State update` );
            console.log( objectClone( dataUpdated ) );

            return dataUpdated;
        } );
    }, [] );

    stateFacade.dataGet = dataGet;

    stateFacade.dataSet = dataSet;

    const value = useMemo<IContextStateValue>( () => {
        const valueNew = {
            data,
            dataGet,
            dataSet,
            stateFacade,
        };
        return valueNew;
    }, [ data, dataGet, dataSet ] );

    return <ContextState.Provider value={ value }>{children}</ContextState.Provider>;
};

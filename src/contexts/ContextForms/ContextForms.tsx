import { useContextRepositories } from "@contexts/ContextRepositories";
import { stateFacade } from "@contexts/ContextState";
import { createContext, useContext } from "react";
import { FormUserCreate } from "./forms";
import type { IContextFormsProviderState, TContextFormsValue } from "./types";
import type { FC, PropsWithChildren } from "react";

const contextFormsInitialState: IContextFormsProviderState = {
    userCreate: new FormUserCreate(),
};

const contextFormsInitialValue: IContextFormsProviderState = {
    ...contextFormsInitialState,
};

export const ContextForms = createContext<TContextFormsValue>( contextFormsInitialValue );

export function useContextForms (): TContextFormsValue {
    return useContext( ContextForms );
}

export const ContextFormsProvider: FC<PropsWithChildren> = ( { children } ) => {
    const { userCreate } = contextFormsInitialValue;
    const { repositoryUsers } = useContextRepositories();

    userCreate.stateFacade = stateFacade;
    userCreate.submit = repositoryUsers.create;

    return (
        <ContextForms.Provider value={ contextFormsInitialValue }>{children}</ContextForms.Provider>
    );
};

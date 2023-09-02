import { useContextRepositories } from "@contexts/ContextRepositories";
import { stateFacade } from "@contexts/ContextState";
import { createContext, useContext } from "react";
import { FormUserCreate } from "./forms";
import type { IContextFormsProviderState, TContextFormsValue } from "./types";
import type { FC, PropsWithChildren } from "react";

const contextFormsInitialState: IContextFormsProviderState = {
    formUserCreate: new FormUserCreate(),
};

const contextFormsInitialValue: IContextFormsProviderState = {
    ...contextFormsInitialState,
};

export const ContextForms = createContext<TContextFormsValue>( contextFormsInitialValue );

export function useContextForms (): TContextFormsValue {
    return useContext( ContextForms );
}

export const ContextFormsProvider: FC<PropsWithChildren> = ( { children } ) => {
    const { formUserCreate } = contextFormsInitialValue;
    const { repositoryUsers } = useContextRepositories();

    formUserCreate.stateFacade = stateFacade;
    formUserCreate.submit = repositoryUsers.create;

    return (
        <ContextForms.Provider value={ contextFormsInitialValue }>{children}</ContextForms.Provider>
    );
};

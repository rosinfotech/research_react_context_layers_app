import { useContextAPI } from "@contexts/ContextAPI";
import { stateFacade } from "@contexts/ContextState";
import { createContext, useContext } from "react";
import { RepositoryUsers } from "./repositories";
import type { IContextRepositoriesProviderState, IContextRepositoriesValue } from "./types";
import type { FC, PropsWithChildren } from "react";

const contextRepositoriesInitialState: IContextRepositoriesProviderState = {
    repositoryUsers: new RepositoryUsers(),
};

const contextRepositoriesInitialValue: IContextRepositoriesValue = {
    ...contextRepositoriesInitialState,
};

export const ContextRepositories = createContext<IContextRepositoriesValue>(
    contextRepositoriesInitialValue,
);

export function useContextRepositories (): IContextRepositoriesValue {
    return useContext( ContextRepositories );
}

export const ContextRepositoriesProvider: FC<PropsWithChildren> = ( { children } ) => {
    const { api } = useContextAPI();

    if ( !api ) {
        return null;
    }

    const { repositoryUsers } = contextRepositoriesInitialValue;

    repositoryUsers.api = api;
    repositoryUsers.stateFacade = stateFacade;

    return (
        <ContextRepositories.Provider value={ contextRepositoriesInitialValue }>
            {children}
        </ContextRepositories.Provider>
    );
};

import { createContext, useContext } from "react";
import { RepositoryUsers } from "./repositories";
import type { IContextRepositoriesProviderState, IContextRepositoriesValue } from "./types";

const contextRepositoriesInitialState: IContextRepositoriesProviderState = {
    repositoryUsers: new RepositoryUsers(),
};

export const contextRepositoriesInitialValue: IContextRepositoriesValue = {
    ...contextRepositoriesInitialState,
};

export const ContextRepositories = createContext<IContextRepositoriesValue>(
    contextRepositoriesInitialValue,
);

export function useContextRepositories (): IContextRepositoriesValue {
    return useContext( ContextRepositories );
}

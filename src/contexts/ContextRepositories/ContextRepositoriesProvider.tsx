import { useContextAPI } from "@contexts/ContextAPI";
import { ContextRepositories, contextRepositoriesInitialValue } from "./ContextRepositories";
import { ContextRepositoriesInit } from "./ContextRepositoriesInit";
import type { FC, PropsWithChildren } from "react";

export const ContextRepositoriesProvider: FC<PropsWithChildren> = ( { children } ) => {
    const { api } = useContextAPI();

    if ( !api ) {
        return null;
    }

    return (
        <ContextRepositories.Provider value={ contextRepositoriesInitialValue }>
            <ContextRepositoriesInit />
            {children}
        </ContextRepositories.Provider>
    );
};

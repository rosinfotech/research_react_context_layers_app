import { useContextAPI } from "@contexts/ContextAPI";
import { stateFacade } from "@contexts/ContextState";
import { contextRepositoriesInitialValue } from "./ContextRepositories";
import type { FC } from "react";

export const ContextRepositoriesInit: FC = () => {
    const { api } = useContextAPI();

    const { repositoryUsers } = contextRepositoriesInitialValue;

    repositoryUsers.api = api;
    repositoryUsers.stateFacade = stateFacade;

    return null;
};

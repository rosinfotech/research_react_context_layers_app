import { useContextRepositories } from "@contexts/ContextRepositories";
import { stateFacade } from "@contexts/ContextState";
import { type FC, useEffect } from "react";
import { contextFormsInitialValue } from "./ContextForms";

export const ContextFormsInit: FC = () => {
    const { formUserCreate, formUserUpdate } = contextFormsInitialValue;
    const { repositoryUsers } = useContextRepositories();

    formUserCreate.stateFacade = stateFacade;
    formUserCreate.submit = repositoryUsers.create;

    formUserUpdate.stateFacade = stateFacade;
    formUserUpdate.submit = repositoryUsers.update;

    useEffect( () => {
        formUserCreate.isInitializedException();
        formUserUpdate.isInitializedException();
    }, [ formUserCreate, formUserUpdate ] );

    return null;
};

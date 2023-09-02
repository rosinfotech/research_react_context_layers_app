import { DEFAULT_PARAMS_STRING, useContextStateSelector } from "@contexts/ContextState";
import type { IContextStateDataRepositories, TParamsString } from "@contexts/ContextState";

export interface IUseStateSelectorRepositoryListOptions {
    paramsString?: TParamsString;
    stateRepository: keyof IContextStateDataRepositories;
}

export const useStateSelectorRepositoryList = ( options: IUseStateSelectorRepositoryListOptions ) => {
    const { paramsString = DEFAULT_PARAMS_STRING, stateRepository } = options;

    const repositoryList = useContextStateSelector(
        state => state.data.repositories[ stateRepository ]?.data?.lists[ paramsString ]?.data,
    );

    return repositoryList;
};

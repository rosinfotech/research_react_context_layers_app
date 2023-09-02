import { DEFAULT_PARAMS_STRING, useContextStateSelector } from "@contexts/ContextState";
import type { IContextStateRepositories, TParamsString } from "@contexts/ContextState";

export interface IUseStateSelectorRepositoryListOptions {
    paramsString?: TParamsString;
    stateRepository: keyof IContextStateRepositories;
}

export const useStateSelectorRepositoryListIsOutdated = (
    options: IUseStateSelectorRepositoryListOptions,
) => {
    const { paramsString = DEFAULT_PARAMS_STRING, stateRepository } = options;

    const isOutdated = useContextStateSelector(
        state => state.data.repositories[ stateRepository ]?.data?.lists[ paramsString ]?.isOutdated,
    );

    return isOutdated;
};

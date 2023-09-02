import { DEFAULT_PARAMS_STRING, useContextStateSelector } from "@contexts/ContextState";
import type { IContextStateDataRepositories, TParamsString } from "@contexts/ContextState";

export interface IUseStateSelectorRepositoryListIsOutdatedOptions {
    paramsString?: TParamsString;
    stateRepository: keyof IContextStateDataRepositories;
}

export const useStateSelectorRepositoryListIsOutdated = (
    options: IUseStateSelectorRepositoryListIsOutdatedOptions,
) => {
    const { paramsString = DEFAULT_PARAMS_STRING, stateRepository } = options;

    const isOutdated = useContextStateSelector(
        state => state.data.repositories[ stateRepository ]?.data?.lists[ paramsString ]?.isOutdated,
    );

    return isOutdated;
};

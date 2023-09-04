import { useContextStateSelector } from "@contexts/ContextState";
import type { IContextStateDataRepositories, TId } from "@contexts/ContextState";

export interface IUseStateSelectorRepositoryEntityOptions {
    id: TId;
    stateRepository: keyof IContextStateDataRepositories;
}

export const useStateSelectorRepositoryEntity = (
    options: IUseStateSelectorRepositoryEntityOptions,
) => {
    const { id, stateRepository } = options;

    const repositoryEntity = useContextStateSelector(
        state => state.data.repositories[ stateRepository ]?.data?.entities[ id ]?.data,
    );

    return repositoryEntity;
};

import { DEFAULT_PARAMS_STRING, useContextStateSelector } from "@contexts/ContextState";
import { ErrorCode } from "@rosinfo.tech/utils";
import type { IContextStateDataRepositories, TParamsString } from "@contexts/ContextState";

export interface IUseStateSelectorRepositoryListOptions {
    paramsString?: TParamsString;
    stateRepository: keyof IContextStateDataRepositories | null;
}

export const useStateSelectorRepositoryList = ( options: IUseStateSelectorRepositoryListOptions ) => {
    const { paramsString = DEFAULT_PARAMS_STRING, stateRepository } = options;

    const repositoryList = useContextStateSelector( ( state ) => {
        if ( !stateRepository ) {
            throw new ErrorCode( "0509231314" );
        }
        return state.data.repositories[ stateRepository ]?.data?.lists[ paramsString ]?.data;
    } );

    return repositoryList;
};

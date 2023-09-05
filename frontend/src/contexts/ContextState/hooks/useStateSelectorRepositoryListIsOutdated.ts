import { DEFAULT_PARAMS_STRING, useContextStateSelector } from "@contexts/ContextState";
import { ErrorCode } from "@rosinfo.tech/utils";
import type { IContextStateDataRepositories, TParamsString } from "@contexts/ContextState";

export interface IUseStateSelectorRepositoryListIsOutdatedOptions {
    paramsString?: TParamsString;
    stateRepository: keyof IContextStateDataRepositories | null;
}

export const useStateSelectorRepositoryListIsOutdated = (
    options: IUseStateSelectorRepositoryListIsOutdatedOptions,
) => {
    const { paramsString = DEFAULT_PARAMS_STRING, stateRepository } = options;

    const isOutdated = useContextStateSelector( ( state ) => {
        if ( !stateRepository ) {
            throw new ErrorCode( "0509231315" );
        }
        return state.data.repositories[ stateRepository ]?.data?.lists[ paramsString ]?.isOutdated;
    } );

    return isOutdated;
};

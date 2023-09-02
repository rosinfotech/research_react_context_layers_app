import {
    DEFAULT_PARAMS_STRING,
    useStateSelectorRepositoryList,
    useStateSelectorRepositoryListIsOutdated,
} from "@contexts/ContextState";
import { useEffect, useMemo } from "react";
import type { RepositoryAbstract } from "../repositories";
import type { TId, TParamsString } from "@contexts/ContextState";
import type { FC } from "react";

interface IComponentRendererProps {
    id: TId;
}

interface IRepositoryViewListProps<E> {
    ReactElementRenderer: FC<IComponentRendererProps>;
    paramsString?: TParamsString;
    repository: RepositoryAbstract<E>;
}

export const RepositoryViewList = <E,>( props: IRepositoryViewListProps<E> ) => {
    const { ReactElementRenderer, paramsString = DEFAULT_PARAMS_STRING, repository } = props;

    const listEntities = useStateSelectorRepositoryList( {
        paramsString,
        stateRepository: repository.stateRepository,
    } );

    const listIsOutdated = useStateSelectorRepositoryListIsOutdated( {
        paramsString,
        stateRepository: repository.stateRepository,
    } );

    useEffect( () => {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if ( !repository || !!listEntities && !listIsOutdated ) {
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        repository.listGet();
    }, [ listEntities, listIsOutdated, repository ] );

    const entitiesRendered = useMemo(
        () => listEntities?.map( id => <ReactElementRenderer key={ id } id={ id } /> ),
        [ ReactElementRenderer, listEntities ],
    );

    return entitiesRendered;
};

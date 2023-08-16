import { useEffect, useState } from "react";
import type { RepositoryAbstract } from "./repositories";
import type { TId } from "@contexts/ContextState";
import type { FC, ReactElement } from "react";

interface IComponentRendererProps {
    id: TId;
}

interface IRepositoryViewArrayEntitiesProps<E> {
    ReactElementRenderer: FC<IComponentRendererProps>;
    repositoryClass: RepositoryAbstract<E>;
}

export const RepositoryViewListEntities = <E,>( props: IRepositoryViewArrayEntitiesProps<E> ) => {
    const { ReactElementRenderer, repositoryClass } = props;
    const [ entitiesRendered, entitiesRenderedSet ] = useState<Array<ReactElement>>( [] );

    useEffect( () => {
        repositoryClass
            .entitiesListGet()
            .then( ( listEntities ) => {
                if ( !listEntities ) {
                    return;
                }
                entitiesRenderedSet(
                    listEntities.map( id => <ReactElementRenderer key={ id } id={ id } /> ),
                );
            } )
            .catch( ( e ) => {
                throw e;
            } );
    }, [ ReactElementRenderer, repositoryClass ] );

    return entitiesRendered;
};

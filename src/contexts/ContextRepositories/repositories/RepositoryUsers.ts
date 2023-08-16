import { ErrorCode } from "@rosinfo.tech/utils";
import { RepositoryAbstract } from "./RepositoryAbstract";
import type { TResponseArrayEntity } from "@contexts/ContextAPI";
import type { TId } from "@contexts/ContextState";
import type { IUser } from "@src/types";

export class RepositoryUsers extends RepositoryAbstract<IUser> {

    public entitiesListAPI = async () => {
        if ( !this.api ) {
            throw new ErrorCode( "2807231506" );
        }
        const { data } = await this.api.get<TResponseArrayEntity<IUser>>( "users" );
        return data;
    };

    public async entitiesListGet () {
        this.isInitializedException();

        const entities = await this.contextStateFacade?.stateRepositoryEntitiesListGet<IUser>( {
            entitiesListAPI    : this.entitiesListAPI,
            idField            : "id",
            stateRepositoryName: "repositoryUsers",
        } );

        return entities;
    }

    public entityDeleteAPI = async ( id: TId ) => {
        if ( !this.api ) {
            throw new ErrorCode( "1608231128" );
        }
        await this.api.delete( `users/${ id }` );
    };

    // eslint-disable-next-line
    public async entityDelete(id: TId) {
        this.isInitializedException();

        await this.contextStateFacade?.stateRepositoryEntityDelete<IUser>( {
            entityDeleteAPI    : this.entityDeleteAPI,
            id,
            stateRepositoryName: "repositoryUsers",
        } );
    }

}

import { ErrorCode } from "@rosinfo.tech/utils";
import type { IUser } from "@@types";
import { RepositoryAbstract } from "./RepositoryAbstract";
import type { TResponseArrayEntity } from "@contexts/ContextAPI";
import type { TId } from "@contexts/ContextState";

export class RepositoryUsers extends RepositoryAbstract<IUser> {

    constructor () {
        super();
        this.create = this.create.bind( this );
    }

    public async create ( user: IUser ) {
        if ( !this.api ) {
            throw new ErrorCode( "2908232359" );
        }

        await this.api.post<IUser>( "users", user );
    }

    // TODO Free of "entities" prefix?
    public entitiesListAPI = async () => {
        if ( !this.api ) {
            throw new ErrorCode( "2807231506" );
        }
        const { data } = await this.api.get<TResponseArrayEntity<IUser>>( "users" );
        return data;
    };

    public async entitiesListGet () {
        this.isInitializedException();

        const entities = await this.stateFacade?.stateRepositoryEntitiesListGet<IUser>( {
            entitiesListAPI    : this.entitiesListAPI,
            idField            : "id",
            stateRepositoryName: "users",
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

        await this.stateFacade?.stateRepositoryEntityDelete<IUser>( {
            entityDeleteAPI    : this.entityDeleteAPI,
            id,
            stateRepositoryName: "users",
        } );
    }

}

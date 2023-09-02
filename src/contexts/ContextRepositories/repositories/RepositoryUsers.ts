import { ErrorCode } from "@rosinfo.tech/utils";
import type { IUser } from "@@types";
import { RepositoryAbstract } from "./RepositoryAbstract";
import type { TResponseArrayEntity, TResponseEntity } from "@contexts/ContextAPI";
import type { IContextStateRepositories, TId } from "@contexts/ContextState";

export class RepositoryUsers extends RepositoryAbstract<IUser> {

    protected _stateRepository: keyof IContextStateRepositories = "repositoryUsers";

    protected _idField: keyof IUser = "id";

    public async createAPI ( user: IUser ) {
        if ( !this.api ) {
            throw new ErrorCode( "3108231350" );
        }

        const { data } = await this.api.post<IUser, TResponseEntity<IUser>>( "users", user );

        return data;
    }

    public async deleteAPI ( id: TId ) {
        if ( !this.api ) {
            throw new ErrorCode( "1608231128" );
        }

        await this.api.delete( `users/${ id }` );
    }

    public async listGetAPI () {
        if ( !this.api ) {
            throw new ErrorCode( "2807231506" );
        }

        const { data } = await this.api.get<TResponseArrayEntity<IUser>>( "users" );
        return data;
    }

}

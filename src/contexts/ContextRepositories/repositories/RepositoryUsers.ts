import { ErrorCode } from "@rosinfo.tech/utils";
import type { IUser } from "@@types";
import { RepositoryAbstract } from "./RepositoryAbstract";
import type { TResponseArrayEntity, TResponseEntity } from "@contexts/ContextAPI";
import type { IContextStateDataRepositories, TId } from "@contexts/ContextState";

export class RepositoryUsers extends RepositoryAbstract<IUser> {

    protected stateRepository: keyof IContextStateDataRepositories = "repositoryUsers";

    protected idField: keyof IUser = "id";

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

    public async updateAPI ( user: IUser ) {
        if ( !this.api ) {
            throw new ErrorCode( "0509230102" );
        }

        if ( !user[ this.idField ] ) {
            throw new ErrorCode( "0509230109" );
        }

        const { data } = await this.api.put<IUser, TResponseEntity<IUser>>(
            `users/${ user[ this.idField ] }`,
            user,
        );

        return data;
    }

    public async listGetAPI () {
        if ( !this.api ) {
            throw new ErrorCode( "2807231506" );
        }

        const { data } = await this.api.get<TResponseArrayEntity<IUser>>( "users" );
        return data;
    }

}

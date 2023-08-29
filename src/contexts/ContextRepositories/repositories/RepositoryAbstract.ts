/* eslint-disable @typescript-eslint/member-ordering, @typescript-eslint/adjacent-overload-signatures, @typescript-eslint/require-await */
import { ErrorCode } from "@rosinfo.tech/utils";
import type { TAPI, TResponseArrayEntity } from "@contexts/ContextAPI";
import type { ContextStateFacade, TEntitiesList, TId } from "@contexts/ContextState";

export class RepositoryAbstract<E> {

    private _api: TAPI | null = null;

    private _stateFacade: ContextStateFacade | null = null;

    public get api () {
        return this._api;
    }

    public set api ( api: TAPI | null ) {
        this._api = api;
    }

    public get stateFacade () {
        return this._stateFacade;
    }

    public set stateFacade ( stateFacade: ContextStateFacade | null ) {
        this._stateFacade = stateFacade;
    }

    public isInitialized () {
        return !!this._api && !!this._stateFacade;
    }

    public isInitializedException () {
        this.stateFacade?.isInitializedException();

        if ( !this.isInitialized() ) {
            throw new ErrorCode( "2607232214", `Repository is not initialized` );
        }
        return true;
    }

    public async createAPI ( entity: E ): Promise<void> {
        throw new ErrorCode(
            "2208231254",
            `Method "createAPI" must be implemented. Called with <${ JSON.stringify( entity ) }>`,
        );
    }

    public async create ( entity: E ): Promise<void> {
        throw new ErrorCode(
            "2208231255",
            `Method "create" must be implemented. Called with <${ JSON.stringify( entity ) }>`,
        );
    }

    public async entityDeleteAPI ( id: TId ): Promise<void> {
        throw new ErrorCode(
            "1608231347",
            `Method "entityDeleteAPI" must be implemented. Called with <${ id }>`,
        );
    }

    public async entityDelete ( id: TId ): Promise<void> {
        throw new ErrorCode(
            "1508231736",
            `Method "entityDelete" must be implemented. Called with <${ id }>`,
        );
    }

    public entitiesListAPI = async (): Promise<TResponseArrayEntity<E>> => {
        throw new ErrorCode( "2907232217", `Method "entitiesListAPI" must be implemented` );
    };

    public async entitiesListGet (): Promise<TEntitiesList | null | undefined> {
        throw new ErrorCode( "2907232220", `Method "entitiesListGet" must be implemented` );
    }

}

/* eslint-disable @typescript-eslint/member-ordering, @typescript-eslint/adjacent-overload-signatures, @typescript-eslint/require-await */
import { ErrorCode } from "@rosinfo.tech/utils";
import type { TAPI, TResponseArrayEntity } from "@contexts/ContextAPI";
import type { ContextStateFacade, TEntitiesList, TId } from "@contexts/ContextState";

export class RepositoryAbstract<E> {

    private _api: TAPI | null = null;

    private _contextStateFacade: ContextStateFacade | null = null;

    public get api () {
        return this._api;
    }

    public set api ( api: TAPI | null ) {
        this._api = api;
    }

    public get contextStateFacade () {
        return this._contextStateFacade;
    }

    public set contextStateFacade ( contextStateFacade: ContextStateFacade | null ) {
        this._contextStateFacade = contextStateFacade;
    }

    public isInitialized () {
        return !!this._api && !!this._contextStateFacade;
    }

    public isInitializedException () {
        this.contextStateFacade?.isInitializedException();

        if ( !this.isInitialized() ) {
            throw new ErrorCode( "2607232214", `Repository is not initialized` );
        }
        return true;
    }

    public async entityDeleteAPI ( id: TId ): Promise<void> {
        throw new ErrorCode( "1608231347", `Method "entityDeleteAPI" must be implemented. Call with <${ id }>` );
    }

    public async entityDelete ( id: TId ): Promise<void> {
        throw new ErrorCode( "1508231736", `Method "entityDelete" must be implemented. Call with <${ id }>` );
    }

    public entitiesListAPI = async (): Promise<TResponseArrayEntity<E>> => {
        throw new ErrorCode( "2907232217", `Method "entitiesListAPI" must be implemented` );
    };

    public async entitiesListGet (): Promise<TEntitiesList | null | undefined> {
        throw new ErrorCode( "2907232220", `Method "entitiesListGet" must be implemented` );
    }

}

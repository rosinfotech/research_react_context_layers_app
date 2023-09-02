/* eslint-disable @typescript-eslint/member-ordering, @typescript-eslint/adjacent-overload-signatures, @typescript-eslint/require-await */
import { ErrorCode } from "@rosinfo.tech/utils";
import type { TAPI, TResponseArrayEntity } from "@contexts/ContextAPI";
import type {
    ContextStateFacade,
    IContextStateDataRepositories,
    TEntitiesList,
    TId,
} from "@contexts/ContextState";

export class RepositoryAbstract<E> {

    constructor () {
        this.create = this.create.bind( this );
        this.createAPI = this.createAPI.bind( this );
        this.delete = this.delete.bind( this );
        this.deleteAPI = this.deleteAPI.bind( this );
        this.isInitialized = this.isInitialized.bind( this );
        this.isInitializedException = this.isInitializedException.bind( this );
        this.listGet = this.listGet.bind( this );
        this.listGetAPI = this.listGetAPI.bind( this );
    }

    private _api: TAPI | null = null;

    private _stateFacade: ContextStateFacade | null = null;

    protected _stateRepository: keyof IContextStateDataRepositories | null = null;

    protected _idField: keyof E | null = null;

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
        return !!this._api && !!this._stateFacade && !!this._stateRepository && !!this._idField;
    }

    public isInitializedException () {
        this.stateFacade?.isInitializedException();

        if ( !this.isInitialized() ) {
            throw new ErrorCode( "2607232214", `Repository is not initialized` );
        }

        return true;
    }

    public async create ( entity: E ) {
        this.isInitializedException();

        await this.stateFacade?.repositoryCreate<E>( {
            createAPI      : this.createAPI,
            data           : entity,
            // @ts-expect-error Excluded _stateRepository === null by isInitializedException
            idField        : this._idField,
            // @ts-expect-error Excluded _stateRepository === null by isInitializedException
            stateRepository: this._stateRepository,
        } );
    }

    public async createAPI ( entity: E ): Promise<E> {
        throw new ErrorCode(
            "2208231254",
            `Method "createAPI" must be implemented. Called with <${ JSON.stringify( entity ) }>`,
        );
    }

    public async delete ( id: TId ) {
        this.isInitializedException();

        await this.stateFacade?.repositoryDelete<E>( {
            deleteAPI      : this.deleteAPI,
            id,
            // @ts-expect-error Excluded _stateRepository === null by isInitializedException
            stateRepository: this._stateRepository,
        } );
    }

    public async deleteAPI ( id: TId ): Promise<void> {
        throw new ErrorCode(
            "1608231347",
            `Method "deleteAPI" must be implemented. Called with <${ id }>`,
        );
    }

    public async listGet (): Promise<TEntitiesList | null | undefined> {
        this.isInitializedException();

        return this.stateFacade?.repositoryListGet<E>( {
            // @ts-expect-error Excluded _stateRepository === null by isInitializedException
            idField        : this._idField,
            listGetAPI     : this.listGetAPI,
            // @ts-expect-error Excluded _stateRepository === null by isInitializedException
            stateRepository: this._stateRepository,
        } );
    }

    public async listGetAPI (): Promise<TResponseArrayEntity<E>> {
        throw new ErrorCode( "2907232217", `Method "listGetAPI" must be implemented` );
    }

    public get stateRepository () {
        this.isInitializedException();

        return this._stateRepository as keyof IContextStateDataRepositories;
    }

}

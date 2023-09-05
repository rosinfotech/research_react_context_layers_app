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
        this.update = this.update.bind( this );
        this.updateAPI = this.updateAPI.bind( this );
        this.listGet = this.listGet.bind( this );
        this.listGetAPI = this.listGetAPI.bind( this );
    }

    public api: TAPI | null = null;

    public stateFacade: ContextStateFacade | null = null;

    public stateRepository: keyof IContextStateDataRepositories | null = null;

    public idField: keyof E | null = null;

    public isInitialized () {
        return !!this.api && !!this.stateFacade && !!this.stateRepository && !!this.idField;
    }

    public isInitializedException () {
        this.stateFacade?.isInitializedException();

        if ( !this.isInitialized() ) {
            throw new ErrorCode( "2607232214" );
        }

        return true;
    }

    public async create ( entity: E ) {
        this.isInitializedException();

        if ( !this.stateFacade ) {
            throw new ErrorCode( "0309231821" );
        }

        if ( !this.idField ) {
            throw new ErrorCode( "0309231822" );
        }

        if ( !this.stateRepository ) {
            throw new ErrorCode( "0309231823" );
        }

        return this.stateFacade.repositoryCreate<E>( {
            createAPI      : this.createAPI,
            data           : entity,
            idField        : this.idField,
            stateRepository: this.stateRepository,
        } );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async createAPI ( entity: E ): Promise<E> {
        throw new ErrorCode( "2208231254" );
    }

    public async delete ( id: TId ) {
        this.isInitializedException();

        if ( !this.stateRepository ) {
            throw new ErrorCode( "0309231829" );
        }

        await this.stateFacade?.repositoryDelete<E>( {
            deleteAPI      : this.deleteAPI,
            id,
            stateRepository: this.stateRepository,
        } );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async deleteAPI ( id: TId ): Promise<void> {
        throw new ErrorCode( "1608231347" );
    }

    public async update ( entity: E ) {
        this.isInitializedException();

        if ( !this.stateFacade ) {
            throw new ErrorCode( "0309232340" );
        }

        if ( !this.idField ) {
            throw new ErrorCode( "0309232341" );
        }

        if ( !this.stateRepository ) {
            throw new ErrorCode( "0309232342" );
        }

        return this.stateFacade.repositoryUpdate<E>( {
            data           : entity,
            idField        : this.idField,
            stateRepository: this.stateRepository,
            updateAPI      : this.updateAPI,
        } );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async updateAPI ( entity: E ): Promise<E> {
        throw new ErrorCode( "0309232343" );
    }

    public async listGet (): Promise<TEntitiesList | null | undefined> {
        this.isInitializedException();

        if ( !this.idField ) {
            throw new ErrorCode( "0309231827" );
        }

        if ( !this.stateRepository ) {
            throw new ErrorCode( "0309231828" );
        }

        return this.stateFacade?.repositoryListGet<E>( {
            idField        : this.idField,
            listGetAPI     : this.listGetAPI,
            stateRepository: this.stateRepository,
        } );
    }

    public async listGetAPI (): Promise<TResponseArrayEntity<E>> {
        throw new ErrorCode( "2907232217" );
    }

}

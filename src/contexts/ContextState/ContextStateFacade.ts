import { ErrorCode } from "@rosinfo.tech/utils";
import { DEFAULT_PARAMS_STRING } from "./constants";
import { isTDPStateRepository } from "./types";
import type {
    IContextStateProviderState,
    IDataProcessing,
    TDPStateRepository,
    TDataGet,
    TDataSet,
    TEntitiesList,
    TId,
} from "./types";

export interface IStateRepositoryEntitiesGetOptions<E> {
    entitiesListAPI: () => Promise<Array<E>>;
    idField: keyof E;
    stateRepositoryName: keyof IContextStateProviderState;
}

export interface IStateRepositoryEntityDeleteOptions {
    entityDeleteAPI: ( id: TId ) => Promise<void>;
    id: TId;
    stateRepositoryName: keyof IContextStateProviderState;
}

export class ContextStateFacade {

    private _dataGet: TDataGet | null = null;

    private _dataSet: TDataSet | null = null;

    public get dataGet () {
        return this._dataGet;
    }

    public set dataGet ( dataGet: TDataGet | null ) {
        this._dataGet = dataGet;
    }

    // eslint-disable-next-line @typescript-eslint/member-ordering
    public get dataSet () {
        return this._dataSet;
    }

    public set dataSet ( dataSet: TDataSet | null ) {
        this._dataSet = dataSet;
    }

    public static dataProcessingGenerate = <E>( data: E | null = null ): IDataProcessing<E> => ( {
        data,
        error     : null,
        isError   : false,
        isFetched : false,
        isFetching: false,
        timestamp : Date.now(),
    } );

    public static stateRepositoryGenerate = <E>(): TDPStateRepository<E> => ( {
        ...ContextStateFacade.dataProcessingGenerate<E>(),
        data: {
            entities: {},
            lists   : {},
            pages   : {},
        },
    } );

    public isInitialized () {
        return !!this._dataGet && !!this._dataSet;
    }

    public isInitializedException () {
        if ( !this.isInitialized() ) {
            throw new ErrorCode( "2807231414" );
        }
        return true;
    }

    public async stateRepositoryEntityDelete<E>( options: IStateRepositoryEntityDeleteOptions ) {
        if ( !this.dataGet || !this.dataSet ) {
            throw new ErrorCode( "1508231755" );
        }

        const { entityDeleteAPI, id, stateRepositoryName } = options;

        const stateRepository = this.dataGet()[ stateRepositoryName ];

        if ( !isTDPStateRepository<E>( stateRepository ) ) {
            throw new ErrorCode( "1508231758" );
        }

        if ( !stateRepository.data ) {
            throw new ErrorCode( "1608231307" );
        }

        stateRepository.isFetching = true;

        this.dataSet( {
            [ stateRepositoryName ]: stateRepository,
        } );

        stateRepository.isFetching = false;

        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete stateRepository.data.entities[ id ];

        for ( const [ , list ] of Object.entries( stateRepository.data.lists ) ) {
            if ( !!list.data && list.data.includes( id ) ) {
                list.data = list.data.filter( v => v !== id );
            }
        }

        for ( const [ , pages ] of Object.entries( stateRepository.data.pages ) ) {
            if ( !pages.data ) {
                continue;
            }

            for ( const [ page, list ] of Object.entries( pages.data ) ) {
                if ( list.includes( id ) ) {
                    pages.data[ page ] = list.filter( v => v !== id );
                }
            }
        }

        await entityDeleteAPI( id );

        this.dataSet( {
            [ stateRepositoryName ]: stateRepository,
        } );
    }

    public async stateRepositoryEntitiesListGet<E>( options: IStateRepositoryEntitiesGetOptions<E> ) {
        if ( !this.dataGet || !this.dataSet ) {
            throw new ErrorCode( "2807231447" );
        }

        const { entitiesListAPI, idField, stateRepositoryName } = options;

        const stateRepositoryCurrent = this.dataGet()[ stateRepositoryName ];

        const stateRepository = isTDPStateRepository<E>( stateRepositoryCurrent )
            ? stateRepositoryCurrent
            : ContextStateFacade.stateRepositoryGenerate<E>();

        if ( !isTDPStateRepository( stateRepository ) ) {
            throw new ErrorCode( "2707231655" );
        }

        if ( !stateRepository.data ) {
            throw new ErrorCode( "1608231308" );
        }

        stateRepository.isFetching = true;

        this.dataSet( {
            // @ts-expect-error There is no way to explain that <E> in the context according generic type for stateRepositoryName
            [ stateRepositoryName ]: stateRepository,
        } );

        stateRepository.isFetching = false;

        const data = await entitiesListAPI();

        const timestamp = Date.now();

        data.reduce( ( acc, item ) => {
            acc[ item[ idField ] as string ] = {
                data      : item,
                error     : undefined,
                isError   : false,
                isFetched : true,
                isFetching: false,
                timestamp,
            };
            return acc;
        }, stateRepository.data.entities );

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        stateRepository.data.lists[ DEFAULT_PARAMS_STRING ]
            = stateRepository.data.lists[ DEFAULT_PARAMS_STRING ]
            ?? ContextStateFacade.dataProcessingGenerate<TEntitiesList>( [] );

        data.reduce( ( acc, item ) => {
            acc.data?.push( String( item[ idField ] ) );
            return acc;
        }, stateRepository.data.lists[ DEFAULT_PARAMS_STRING ] );

        this.dataSet( {
            // @ts-expect-error There is no way to explain that <E> in the context according generic type for stateRepositoryName
            [ stateRepositoryName ]: stateRepository,
        } );

        return stateRepository.data.lists[ DEFAULT_PARAMS_STRING ].data;
    }

}

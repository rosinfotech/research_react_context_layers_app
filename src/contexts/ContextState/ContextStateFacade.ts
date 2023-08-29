import { ErrorCode, isBoolean, objectClone } from "@rosinfo.tech/utils";
import { DEFAULT_PARAMS_STRING } from "./constants";
import { isTDPStateRepository } from "./types";
import type {
    IContextStateDataForms,
    IContextStateDataRepositories,
    IDataProcessing,
    IStateForm,
    TDPStateRepository,
    TDataGet,
    TDataSet,
    TEntitiesList,
    TId,
} from "./types";

interface IStateRepositoryEntitiesGetOptions<E> {
    entitiesListAPI: () => Promise<Array<E>>;
    idField: keyof E;
    stateRepositoryName: keyof IContextStateDataRepositories;
}

interface IStateRepositoryEntityDeleteOptions {
    entityDeleteAPI: ( id: TId ) => Promise<void>;
    id: TId;
    stateRepositoryName: keyof IContextStateDataRepositories;
}

interface IFormInitialValuesSetOptions<F> {
    force?: boolean;
    initialValuesGet: () => F;
    stateForm: keyof IContextStateDataForms;
}

interface IFormValueSetOptions<F, N extends keyof F = keyof F> {
    formField: N;
    initialValuesGet: () => F;
    stateForm: keyof IContextStateDataForms;
    value: F[ N ];
}

interface IFormDataSubmitOptions<F, E, ERT> {
    formDataIsValid: ( data: F ) => boolean | IStateForm<F, ERT>["errors"];
    formDataToEntityAdapter: ( entity: F ) => E;
    initialValuesGet: () => F;
    stateForm: keyof IContextStateDataForms;
    submit: ( entity: E ) => Promise<void>;
}

// interface IFormValueSetOptions<F> {
//     formField: keyof F;
//     initialValuesGet: () => F;
//     stateForm: keyof IContextStateDataForms;
//     value: F[keyof F];
// }

// https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgJIDFhQM5mQbwChlk4AuZXKUAcwG5jkAjCkAVwFsnoGSEKmAe0EAbCHBAMAvoQSCQuZDCy4KGFXgC8BRiXLIA5HAMAaXcwoAmMyT4UwUNhDNSGhUJFiIUqAMoQ5EAATAB4AaQgAT2QIAA9IYOxkAGsowRg0TBwtFLSM9WyAPh0SEDgOCAB5GEwIESD0KEEOLNVkCMjeZDkoKAhsAAd5INoAFUiBqpgANTgRJ2ra+oBBIQA3CDVWsABtDoBdaUJCGDYQBDBgeWQwQX9A0I6Y+IhE3Mj0zI1CgAplbK2GhM7woHQAlGp7sNwlFikRbMg+mA2FAQCUEbYyhVFsA6g0mi0NBRUpEbBi+IJev0hsExhMprN5lMlkFVoINhR-rgdiT9mSSK5CDITmcLlc0dgAsMAEJ1eQ0bCjQQdGHROIJIJJEmfAq4X6Sh6QqXBYEk0FRCGUY1BZDAJJ+a2quHmJEoiXWgB0WOZuPqjWa22QmmD7yOsnkihJSW0OyMpkMCHjBiYBn2pCSZ2SIEEAHc0XAkj9tfltmCdodwwo8AbhkGbndrX8ge9sDsAIz7MEMYAZH414KykTyxXKqJ963AgyJsFg9EUhSiCAeoc0ccPD09PqDYZ0ybVRkLGq+1nrCBd8wAegv5JvCIAegB+IVAA

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

    public static formGenerate = <F>( initialValues: F ): IStateForm<F> => ( {
        data        : objectClone( initialValues ),
        errors      : null,
        isSubmitting: false,
        submitted   : [],
        touched     : {},
    } );

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

        const state = this.dataGet();

        const stateRepository = state.repositories[ stateRepositoryName ];

        if ( !isTDPStateRepository<E>( stateRepository ) ) {
            throw new ErrorCode( "1508231758" );
        }

        if ( !stateRepository.data ) {
            throw new ErrorCode( "1608231307" );
        }

        stateRepository.isFetching = true;

        this.dataSet( {
            repositories: {
                ...state.repositories,
                [ stateRepositoryName ]: stateRepository,
            },
        } );

        stateRepository.isFetching = false;

        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete stateRepository.data.entities[ id ];

        for ( const [ , list ] of Object.entries( stateRepository.data.lists ) ) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            if ( !!list.data && list.data.includes( id ) ) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                list.data = list.data.filter( v => v !== id );
            }
        }

        for ( const [ , pages ] of Object.entries( stateRepository.data.pages ) ) {
            if ( !pages.data ) {
                continue;
            }

            for ( const [ page, list ] of Object.entries( pages.data ) ) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                if ( list.includes( id ) ) {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                    pages.data[ page ] = list.filter( v => v !== id );
                }
            }
        }

        await entityDeleteAPI( id );

        this.dataSet( {
            repositories: {
                ...state.repositories,
                [ stateRepositoryName ]: stateRepository,
            },
        } );

    }

    public async stateRepositoryEntitiesListGet<E>( options: IStateRepositoryEntitiesGetOptions<E> ) {
        if ( !this.dataGet || !this.dataSet ) {
            throw new ErrorCode( "2807231447" );
        }

        const { entitiesListAPI, idField, stateRepositoryName } = options;

        const state = this.dataGet();

        const stateRepositoryCurrent = state.repositories[ stateRepositoryName ];

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
            repositories: {
                ...state.repositories,
                // @ts-expect-error TS does not recognize correspondence
                [ stateRepositoryName ]: stateRepository,
            },
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

        stateRepository.data.lists[ DEFAULT_PARAMS_STRING ]
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            = stateRepository.data.lists[ DEFAULT_PARAMS_STRING ]
            ?? ContextStateFacade.dataProcessingGenerate<TEntitiesList>( [] );

        data.reduce( ( acc, item ) => {
            acc.data?.push( String( item[ idField ] ) );
            return acc;
        }, stateRepository.data.lists[ DEFAULT_PARAMS_STRING ] );

        this.dataSet( {
            repositories: {
                ...state.repositories,
                // @ts-expect-error TS does not recognize correspondence
                [ stateRepositoryName ]: stateRepository,
            },
        } );

        return stateRepository.data.lists[ DEFAULT_PARAMS_STRING ].data;
    }

    public formInitialValuesSet<F>( options: IFormInitialValuesSetOptions<F> ) {

        if ( !this.dataGet || !this.dataSet ) {
            throw new ErrorCode( "1908231722" );
        }

        const {
            force,
            initialValuesGet,
            stateForm,
        } = options;

        const state = this.dataGet();

        if ( !force && !!state.forms[ stateForm ] ) {
            return;
        }

        this.dataSet( {
            forms: {
                ...state.forms,
                // @ts-expect-error F does not extendable (?)
                [ stateForm ]: ContextStateFacade.formGenerate( initialValuesGet() ),
            },
        } );

    }

    public formValueSet<F>( options: IFormValueSetOptions<F> ) {

        if ( !this.dataGet || !this.dataSet ) {
            throw new ErrorCode( "1908231722" );
        }

        const {
            formField,
            initialValuesGet,
            stateForm,
            value,
        } = options;

        this.formInitialValuesSet<F>( {
            initialValuesGet,
            stateForm,
        } );

        const state = this.dataGet();

        if ( !state.forms[ stateForm ] ) {
            throw new ErrorCode( "2008231627" );
        }

        // @ts-expect-error Not null
        const { data, touched } = state.forms[ stateForm ];

        data[ formField ] = value;

        touched[ formField ] = true;

        // @ts-expect-error Not null
        state.forms[ stateForm ].data = { ...data };

        this.dataSet( state );

    }

    // public formDataGet <F>( stateForm: keyof IContextStateDataForms ) {

    //     if ( !this.dataGet || !this.dataSet ) {
    //         throw new ErrorCode( "2208231541" );
    //     }

    //     const state = this.dataGet();

    //     if ( !state.forms[ stateForm ] ) {
    //         throw new ErrorCode( "2008231547" );
    //     }

    //     const { data } = state.forms[ stateForm ] ?? {};

    //     return data as F | undefined;
    // }

    public async formDataSubmit <F, E, ERT>( options: IFormDataSubmitOptions<F, E, ERT> ): Promise<boolean | IStateForm<F, ERT>["errors"]> {

        if ( !this.dataGet || !this.dataSet ) {
            throw new ErrorCode( "2208231604" );
        }

        const {
            formDataIsValid,
            formDataToEntityAdapter,
            initialValuesGet,
            stateForm,
            submit,
        } = options;

        const state = this.dataGet();

        if ( !state.forms[ stateForm ] ) {
            throw new ErrorCode( "2008231608" );
        }

        const form = state.forms[ stateForm ] as IStateForm<F>;

        if ( !form.data ) {
            return false;
        }

        const { data } = form;

        const validationResult = formDataIsValid( data );

        if ( isBoolean( validationResult ) && validationResult ) {

            // @ts-expect-error Not null
            state.forms[ stateForm ].errors = null;

            // @ts-expect-error Not null
            state.forms[ stateForm ].isSubmitting = true;

            this.dataSet( state );

            await submit( formDataToEntityAdapter( data ) );

            // @ts-expect-error Not null
            state.forms[ stateForm ].isSubmitting = false;

            // @ts-expect-error Not null
            state.forms[ stateForm ].data = { ...initialValuesGet() };

            this.dataSet( state );

            return validationResult;
        }

        // @ts-expect-error Not null
        state.forms[ stateForm ].errors = validationResult;

        this.dataSet( state );

        return validationResult;
    }

}

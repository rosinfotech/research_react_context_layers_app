import { ErrorCode, isBoolean, objectClone } from "@rosinfo.tech/utils";
import {
    DEFAULT_PARAMS_STRING,
    TIMESTAMP_CODE_NEED_UPDATE,
    TIME_OBSOLESCENCE_MS,
} from "./constants";
import { isTDPStateRepository } from "./types";
import type {
    IContextStateForms,
    IContextStateRepositories,
    IDataProcessing,
    IStateForm,
    TDPStateRepository,
    TDataGet,
    TDataSet,
    TEntitiesList,
    TId,
} from "./types";

interface IRepositoryListGetOptions<E> {
    idField: keyof E;
    listGetAPI: () => Promise<Array<E>>;
    stateRepository: keyof IContextStateRepositories;
}

interface IRepositoryDeleteOptions {
    deleteAPI: ( id: TId ) => Promise<void>;
    id: TId;
    stateRepository: keyof IContextStateRepositories;
}

interface IRepositoryCreateOptions<E> {
    createAPI: ( data: E ) => Promise<E>;
    data: E;
    idField: keyof E;
    stateRepository: keyof IContextStateRepositories;
}

interface IFormValuesInitialSetOptions<F> {
    force?: boolean;
    stateForm: keyof IContextStateForms;
    valuesInitialGet: () => F;
}

interface IFormFieldValueSetOptions<F, N extends keyof F = keyof F> {
    formField: N;
    stateForm: keyof IContextStateForms;
    value: F[N];
    valuesInitialGet: () => F;
}

interface IFormDataSubmitOptions<F, E> {
    formDataIsValid: ( data: F ) => boolean | IStateForm<F>["errors"];
    formDataToEntityAdapter: ( entity: F ) => E;
    stateForm: keyof IContextStateForms;
    submit: ( entity: E ) => Promise<void>;
    valuesInitialGet: () => F;
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

    public static formGenerate = <F>( valuesInitial: F ): IStateForm<F> => ( {
        data        : objectClone( valuesInitial ),
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
        isOutdated: false,
        timestamp : Date.now(),
    } );

    public static isOutdated<E, DPE extends IDataProcessing<E>>(
        structure: DPE,
        timeObsolescenceMs: number = TIME_OBSOLESCENCE_MS,
    ): boolean {
        if ( structure.isOutdated ) {
            return true;
        }
        if ( !structure.timestamp ) {
            throw new ErrorCode( "0109232123" );
        }
        const timestampCurrent = Date.now();
        if ( timestampCurrent - structure.timestamp > timeObsolescenceMs ) {
            return true;
        }
        return false;
    }

    public static isReplaceDataInDPStructureNeeded<
        E,
        DPE extends IDataProcessing<E> = IDataProcessing<any>,
    >( structure: DPE, dataNew: E ): boolean {
        if (
            JSON.stringify( structure.data ) !== JSON.stringify( dataNew )
            || ContextStateFacade.isOutdated<E, DPE>( structure )
        ) {
            return true;
        }
        return false;
    }

    public static repositoryGenerate = <E>(): TDPStateRepository<E> => ( {
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

    public async repositoryCreate<E>( options: IRepositoryCreateOptions<E> ) {
        if ( !this.dataGet || !this.dataSet ) {
            throw new ErrorCode( "0109231818" );
        }
        const { createAPI, data, idField, stateRepository: stateRepositoryKey } = options;

        const state = this.dataGet();

        const stateRepository = state.repositories[ stateRepositoryKey ];

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
                [ stateRepositoryKey ]: stateRepository,
            },
        } );

        stateRepository.isFetching = false;

        const item = await createAPI( data );

        const timestamp = Date.now();

        stateRepository.data.entities[ item[ idField ] as string ] = {
            // @ts-expect-error TODO Predicate item assign to E
            data      : item,
            error     : undefined,
            isError   : false,
            isFetched : true,
            isFetching: false,
            isOutdated: false,
            timestamp,
        };

        for ( const [ , list ] of Object.entries( stateRepository.data.lists ) ) {
            list.timestamp = TIMESTAMP_CODE_NEED_UPDATE;
            list.isOutdated = true;
        }

        for ( const [ , pages ] of Object.entries( stateRepository.data.pages ) ) {
            pages.timestamp = TIMESTAMP_CODE_NEED_UPDATE;
            pages.isOutdated = true;
        }

        this.dataSet( {
            repositories: {
                ...state.repositories,
                [ stateRepositoryKey ]: stateRepository,
            },
        } );
    }

    public async repositoryDelete<E>( options: IRepositoryDeleteOptions ) {
        if ( !this.dataGet || !this.dataSet ) {
            throw new ErrorCode( "1508231755" );
        }

        const { deleteAPI, id, stateRepository: stateRepositoryKey } = options;

        const state = this.dataGet();

        const stateRepository = state.repositories[ stateRepositoryKey ];

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
                [ stateRepositoryKey ]: stateRepository,
            },
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
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                if ( list.includes( id ) ) {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                    pages.data[ page ] = list.filter( v => v !== id );
                }
            }
        }

        await deleteAPI( id );

        this.dataSet( {
            repositories: {
                ...state.repositories,
                [ stateRepositoryKey ]: stateRepository,
            },
        } );
    }

    public async repositoryListGet<E>( options: IRepositoryListGetOptions<E> ) {
        if ( !this.dataGet || !this.dataSet ) {
            throw new ErrorCode( "2807231447" );
        }

        const { idField, listGetAPI, stateRepository: stateRepositoryKey } = options;

        const state = this.dataGet();

        const stateRepositoryCurrent = state.repositories[ stateRepositoryKey ];

        const stateRepository = isTDPStateRepository<E>( stateRepositoryCurrent )
            ? stateRepositoryCurrent
            : ContextStateFacade.repositoryGenerate<E>();

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
                [ stateRepositoryKey ]: stateRepository,
            },
        } );

        stateRepository.isFetching = false;

        const data = await listGetAPI();

        const timestamp = Date.now();

        data.reduce( ( acc, item ) => {
            const entityNew = {
                data      : item,
                error     : undefined,
                isError   : false,
                isFetched : true,
                isFetching: false,
                isOutdated: false,
                timestamp,
            };
            if (
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                !acc[ item[ idField ] as string ]
                || !!ContextStateFacade.isReplaceDataInDPStructureNeeded<E>(
                    acc[ item[ idField ] as string ],
                    item,
                )
            ) {
                acc[ item[ idField ] as string ] = entityNew;
            }
            return acc;
        }, stateRepository.data.entities );

        stateRepository.data.lists[ DEFAULT_PARAMS_STRING ]
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            = stateRepository.data.lists[ DEFAULT_PARAMS_STRING ]
            && !ContextStateFacade.isOutdated( stateRepository.data.lists[ DEFAULT_PARAMS_STRING ] )
                ? stateRepository.data.lists[ DEFAULT_PARAMS_STRING ]
                : ContextStateFacade.dataProcessingGenerate<TEntitiesList>( [] );

        stateRepository.isOutdated = false;

        data.reduce( ( acc, item ) => {
            acc.data?.push( String( item[ idField ] ) );
            return acc;
        }, stateRepository.data.lists[ DEFAULT_PARAMS_STRING ] );

        this.dataSet( {
            repositories: {
                ...state.repositories,
                // @ts-expect-error TS does not recognize correspondence
                [ stateRepositoryKey ]: stateRepository,
            },
        } );

        return stateRepository.data.lists[ DEFAULT_PARAMS_STRING ].data;
    }

    public formValuesInitialSet<F>( options: IFormValuesInitialSetOptions<F> ) {
        if ( !this.dataGet || !this.dataSet ) {
            throw new ErrorCode( "1908231722" );
        }

        const { force, stateForm, valuesInitialGet } = options;

        const state = this.dataGet();

        if ( !force && !!state.forms[ stateForm ] ) {
            return;
        }

        this.dataSet( {
            forms: {
                ...state.forms,
                // @ts-expect-error F does not extendable (?)
                [ stateForm ]: ContextStateFacade.formGenerate( valuesInitialGet() ),
            },
        } );
    }

    public formFieldValueSet<F>( options: IFormFieldValueSetOptions<F> ) {
        if ( !this.dataGet || !this.dataSet ) {
            throw new ErrorCode( "1908231722" );
        }

        const { formField, stateForm, value, valuesInitialGet } = options;

        this.formValuesInitialSet<F>( {
            stateForm,
            valuesInitialGet,
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

    public async formSubmit<F, E>(
        options: IFormDataSubmitOptions<F, E>,
    ): Promise<boolean | IStateForm<F>["errors"]> {
        if ( !this.dataGet || !this.dataSet ) {
            throw new ErrorCode( "2208231604" );
        }

        const { formDataIsValid, formDataToEntityAdapter, stateForm, submit, valuesInitialGet }
            = options;

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
            state.forms[ stateForm ].data = { ...valuesInitialGet() };

            // @ts-expect-error Not null
            state.forms[ stateForm ].touched = {};

            this.dataSet( state );

            return validationResult;
        }

        // @ts-expect-error Not null
        state.forms[ stateForm ].errors = validationResult;

        this.dataSet( state );

        return validationResult;
    }

}

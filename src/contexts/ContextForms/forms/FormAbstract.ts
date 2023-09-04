import { ErrorCode, memoize } from "@rosinfo.tech/utils";
import type {
    ContextStateFacade,
    IContextStateDataForms,
    IContextStateDataRepositories,
    IStateForm,
    TId,
} from "@contexts/ContextState";
import type { ChangeEvent } from "react";

export class FormAbstract<F, E> {

    public formFieldOnChangeEventGet: <H extends HTMLInputElement>(
        formField: keyof F
    ) => ( e: ChangeEvent<H> ) => void;

    public entityId: TId | null = null;

    public stateFacade: ContextStateFacade | null = null;

    protected stateForm: keyof IContextStateDataForms | null = null;

    protected stateRepository: keyof IContextStateDataRepositories | null = null;

    private _submit: ( ( entity: E ) => Promise<E> ) | null = null;

    constructor () {
        this.entityToFormDataAdapter = this.entityToFormDataAdapter.bind( this );
        this.valuesInitialFromEntityGet = this.valuesInitialFromEntityGet.bind( this );
        this.valuesInitialEmptyGet = this.valuesInitialEmptyGet.bind( this );
        this.formDataToEntityAdapter = this.formDataToEntityAdapter.bind( this );
        this.valuesInitialSet = this.valuesInitialSet.bind( this );
        this.valuesInitialGet = this.valuesInitialGet.bind( this );
        this.isInitialized = this.isInitialized.bind( this );
        this.isInitializedException = this.isInitializedException.bind( this );
        this.isValid = this.isValid.bind( this );
        this.formFieldOnChangeEventGet = memoize( this._formFieldOnChangeEventGet.bind( this ) );
        this.onSubmit = this.onSubmit.bind( this );
        this.onReset = this.onReset.bind( this );
    }

    // eslint-disable-next-line @typescript-eslint/member-ordering
    public get submit () {
        this.stateFacade?.isInitializedException();

        return this._submit;
    }

    public set submit ( submit: ( ( entity: E ) => Promise<E> ) | null ) {
        this._submit = !!submit ? submit.bind( this ) : submit;
    }

    public valuesInitialSet ( force?: boolean ) {
        if ( !this.stateForm ) {
            return false;
        }

        this.stateFacade?.formValuesInitialSet<F>( {
            force,
            stateForm       : this.stateForm,
            valuesInitialGet: this.valuesInitialGet,
        } );

        return true;
    }

    public isInitialized () {
        const isInitialized = !!this.stateFacade && !!this.stateForm && !!this.submit;

        if ( isInitialized ) {
            this.valuesInitialSet();
        }

        return isInitialized;
    }

    public isInitializedException () {
        this.stateFacade?.isInitializedException();

        if ( !this.isInitialized() ) {
            throw new ErrorCode( "1708231724" );
        }

        return true;
    }

    public valuesInitialGet (): F {
        throw new ErrorCode( "1908231651" );
    }

    public valuesInitialEmptyGet (): F {
        throw new ErrorCode( "0409232325" );
    }

    public valuesInitialFromEntityGet (): F {
        if ( !this.stateFacade ) {
            throw new Error( "0309232252" );
        }

        if ( !this.stateRepository ) {
            throw new Error( "0309232232" );
        }

        if ( !this.entityId ) {
            return this.valuesInitialEmptyGet();
        }

        const entity = this.stateFacade.repositoryEntityGet<E>( {
            id             : this.entityId,
            stateRepository: this.stateRepository,
        } );

        return this.entityToFormDataAdapter( entity );
    }

    public entityToFormDataAdapter ( data: E ) {
        return data as unknown as F;
    }

    public isValid ( data: F ): boolean | IStateForm<F>["errors"] {
        throw new ErrorCode(
            "2208231522",
            `Method "isValid" must be implemented. Called with <${ JSON.stringify( data ) }>`,
        );
    }

    public formDataToEntityAdapter ( data: F ) {
        return data as unknown as E;
    }

    // TODO Concerns about promisify
    public async onSubmit (
        onSubmitted?: ( validationReturn: boolean | IStateForm<F>["errors"] ) => Promise<void>,
    ) {
        this.isInitializedException();

        if ( !this.stateFacade ) {
            throw new ErrorCode( "0309232253" );
        }

        if ( !this.stateForm ) {
            throw new ErrorCode( "0309232212" );
        }

        if ( !this.submit ) {
            throw new ErrorCode( "0309232213" );
        }

        return this.stateFacade
            .formSubmit<F, E>( {
            formDataIsValid        : this.isValid,
            formDataToEntityAdapter: this.formDataToEntityAdapter,
            stateForm              : this.stateForm,
            submit                 : this.submit,
            valuesInitialGet       : this.valuesInitialGet,
        } )
            .then( async validationReturn => onSubmitted?.( validationReturn ) );
    }

    public onReset () {
        this.valuesInitialSet( true );
    }

    private _formFieldOnChangeEventGet<H extends HTMLInputElement>(
        formField: keyof F,
    ): ( e: ChangeEvent<H> ) => void {
        this.isInitializedException();

        return ( e ) => {
            if ( !this.stateFacade ) {
                throw new ErrorCode( "0309232254" );
            }

            this.stateFacade.formFieldValueSet<F>( {
                formField,
                stateForm       : this.stateForm as keyof IContextStateDataForms,
                value           : e.target.value as F[keyof F],
                valuesInitialGet: this.valuesInitialGet,
            } );
        };
    }

}

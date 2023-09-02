import { ErrorCode, memoize } from "@rosinfo.tech/utils";
import type { ContextStateFacade, IContextStateForms, IStateForm } from "@contexts/ContextState";
import type { ChangeEvent } from "react";

export class FormAbstract<F, E> {

    public formFieldOnChangeEventGet: <H extends HTMLInputElement>(
        formField: keyof F
    ) => ( e: ChangeEvent<H> ) => void;

    protected _stateForm: keyof IContextStateForms | null = null;

    private _stateFacade: ContextStateFacade | null = null;

    private _submit: ( ( entity: E ) => Promise<E> ) | null = null;

    constructor () {
        this.formDataToEntityAdapter = this.formDataToEntityAdapter.bind( this );
        this.valuesInitial = this.valuesInitial.bind( this );
        this.valuesInitialGet = this.valuesInitialGet.bind( this );
        this.isInitialized = this.isInitialized.bind( this );
        this.isInitializedException = this.isInitializedException.bind( this );
        this.isValid = this.isValid.bind( this );
        this.formFieldOnChangeEventGet = memoize( this._formFieldOnChangeEventGet.bind( this ) );
        this.onSubmit = this.onSubmit.bind( this );
        this.onReset = this.onReset.bind( this );
    }

    // eslint-disable-next-line @typescript-eslint/member-ordering
    public get stateFacade () {
        return this._stateFacade;
    }

    public set stateFacade ( stateFacade: ContextStateFacade | null ) {
        this._stateFacade = stateFacade;
    }

    // eslint-disable-next-line @typescript-eslint/member-ordering
    public get stateForm () {
        this.isInitializedException();

        return this._stateForm as keyof IContextStateForms;
    }

    // eslint-disable-next-line @typescript-eslint/member-ordering
    public get submit () {
        this.stateFacade?.isInitializedException();

        return this._submit;
    }

    public set submit ( submit: ( ( entity: E ) => Promise<E> ) | null ) {
        this._submit = !!submit ? submit.bind( this ) : submit;
    }

    public valuesInitial ( force?: boolean ) {
        if ( !this._stateForm ) {
            return false;
        }

        this.stateFacade?.formValuesInitialSet<F>( {
            force,
            stateForm       : this._stateForm,
            valuesInitialGet: this.valuesInitialGet,
        } );

        return true;
    }

    public isInitialized () {
        const isInitialized = !!this._stateFacade && !!this._stateForm && !!this.submit;

        if ( isInitialized ) {
            this.valuesInitial();
        }

        return isInitialized;
    }

    public isInitializedException () {
        this.stateFacade?.isInitializedException();

        if ( !this.isInitialized() ) {
            throw new ErrorCode( "1708231724", `Form is not initialized` );
        }

        return true;
    }

    public valuesInitialGet (): F {
        throw new ErrorCode( "1908231651", `Method "valuesInitialGet" must be implemented` );
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

        return this.stateFacade
            ?.formSubmit<F, E>( {
            formDataIsValid        : this.isValid,
            formDataToEntityAdapter: this.formDataToEntityAdapter,
            stateForm              : this.stateForm,
            // @ts-expect-error Not null
            submit                 : this.submit,
            valuesInitialGet       : this.valuesInitialGet,
        } )
            .then( async validationReturn => onSubmitted?.( validationReturn ) );
    }

    public onReset () {
        this.valuesInitial( true );
    }

    private _formFieldOnChangeEventGet<H extends HTMLInputElement>(
        formField: keyof F,
    ): ( e: ChangeEvent<H> ) => void {
        this.isInitializedException();

        return ( e ) => {
            this.stateFacade?.formFieldValueSet<F>( {
                formField,
                stateForm       : this._stateForm as keyof IContextStateForms,
                value           : e.target.value as F[keyof F],
                valuesInitialGet: this.valuesInitialGet,
            } );
        };
    }

}

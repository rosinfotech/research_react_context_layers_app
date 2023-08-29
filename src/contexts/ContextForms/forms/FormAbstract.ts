import { ErrorCode, memoize } from "@rosinfo.tech/utils";
import type { ContextStateFacade, IContextStateDataForms, IStateForm } from "@contexts/ContextState";
import type { ChangeEvent } from "react";

interface IFormAbstractConstructorOptions<E> {
    stateForm: keyof IContextStateDataForms;
    submit?: ( entity: E ) => Promise<void>;
}

export class FormAbstract<F, E, ERT = string> {

    private _stateFacade: ContextStateFacade | null = null;

    private _stateForm: keyof IContextStateDataForms | null = null;

    private _submit: ( ( entity: E ) => Promise<void> ) | null = null;

    constructor ( options: IFormAbstractConstructorOptions<E> ) {
        const {
            stateForm,
            submit = null,
        } = options;

        this._stateForm = stateForm;
        this._submit = submit;
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
        return this._stateForm;
    }

    public set stateForm ( stateForm: keyof IContextStateDataForms | null ) {
        this._stateForm = stateForm;
    }

    // eslint-disable-next-line @typescript-eslint/member-ordering
    public get submit () {
        return this._submit;
    }

    public set submit ( submit: ( ( entity: E ) => Promise<void> ) | null ) {
        this._submit = submit;
    }

    public initialValues () {
        if ( !this._stateForm ) {
            return false;
        }

        this.stateFacade?.formInitialValuesSet( {
            initialValuesGet: this.initialValuesGet,
            stateForm       : this._stateForm,
        } );

        return true;
    }

    public isInitialized () {
        const isInitialized = !!this._stateFacade && !!this._stateForm && !!this.submit;

        if ( isInitialized ) {
            this.initialValues();
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

    public initialValuesGet = (): F => {
        throw new ErrorCode(
            "1908231651",
            `Method "initialValuesGet" must be implemented`,
        );
    };

    public isValid ( data: F ): boolean | IStateForm<F, ERT>["errors"] {
        throw new ErrorCode(
            "2208231522",
            `Method "isValid" must be implemented. Called with <${ JSON.stringify( data ) }>`,
        );
    }

    // eslint-disable-next-line @typescript-eslint/member-ordering, @typescript-eslint/typedef
    public onChangeEventGet = memoize( <E extends HTMLInputElement>( formField: keyof F ): ( e: ChangeEvent<E> ) => void => {

        this.isInitializedException();

        return ( e ) => {
            this.stateFacade?.formValueSet<F>( {
                formField,
                initialValuesGet: this.initialValuesGet,
                stateForm       : this._stateForm as keyof IContextStateDataForms,
                value           : e.target.value as F[ keyof F ],
            } );
        };
    } );

    public formDataToEntityAdapter ( data: F ) {
        return data as unknown as E;
    }

    // TODO Concerns about promisify
    public async onSubmit ( onSubmitted?: ( validationReturn: boolean | IStateForm<F, ERT>["errors"] ) => Promise<void> ) {

        this.isInitializedException();

        return this.stateFacade?.formDataSubmit<F, E, ERT>( {
            formDataIsValid        : this.isValid,
            formDataToEntityAdapter: this.formDataToEntityAdapter,
            initialValuesGet       : this.initialValuesGet,
            // @ts-expect-error Not null
            stateForm              : this.stateForm,
            // @ts-expect-error Not null
            submit                 : this.submit,
        } ).then( async validationReturn => onSubmitted?.( validationReturn ) );

    }

    // // TODO Concerns about promisify
    // // eslint -disable-next-line @typescript-eslint/member-ordering, @typescript-eslint/typedef
    // public onSubmit = async ( onSubmitted?: ( validationReturn: boolean | IStateForm<F, ERT>["errors"] ) => Promise<void> ) => {

    //     this.isInitializedException();

    //     return this.stateFacade?.formDataSubmit<F, E, ERT>( {
    //         formDataIsValid        : this.isValid,
    //         formDataToEntityAdapter: this.formDataToEntityAdapter,
    //         initialValuesGet       : this.initialValuesGet,
    //         // @ts-expect-error Not null
    //         stateForm              : this.stateForm,
    //         // @ts-expect-error Not null
    //         submit                 : this.submit,
    //     } ).then( async validationReturn => onSubmitted?.( validationReturn ) );

    // };

}

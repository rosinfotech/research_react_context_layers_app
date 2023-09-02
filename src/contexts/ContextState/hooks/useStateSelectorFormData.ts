import { type IContextStateForms, useContextStateSelector } from "@contexts/ContextState";

export interface IUseStateSelectorFormDataOptions {
    stateForm: keyof IContextStateForms;
}

export const useStateSelectorFormData = ( options: IUseStateSelectorFormDataOptions ) => {
    const { stateForm } = options;

    const formData = useContextStateSelector( state => state.data.forms[ stateForm ]?.data );

    return formData;
};

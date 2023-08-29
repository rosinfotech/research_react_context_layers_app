import { type IContextStateDataForms, useContextStateSelector } from "@contexts/ContextState";

export interface IUseFormDataStateSelectorOptions {
    stateForm: keyof IContextStateDataForms;
}

export const useFormDataStateSelector = ( options: IUseFormDataStateSelectorOptions ) => {
    const { stateForm } = options;

    const formData = useContextStateSelector(
        state => state.data.forms[ stateForm ]?.data,
    );

    return formData;
};

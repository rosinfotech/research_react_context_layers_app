import { type IContextStateDataForms, useContextStateSelector } from "@contexts/ContextState";

export interface IUseFormErrorsFieldStateSelectorOptions <F> {
    formField: keyof F;
    stateForm: keyof IContextStateDataForms;
}

export const useFormErrorsFieldStateSelector = <F> ( options: IUseFormErrorsFieldStateSelectorOptions<F> ) => {
    const { formField, stateForm } = options;

    const formErrorsField = useContextStateSelector(
        // @ts-expect-error No way to calculate type of the field
        state => state.data.forms[ stateForm ]?.errors?.[ formField ],
    );

    return formErrorsField;
};

import { type IContextStateDataForms, useContextStateSelector } from "@contexts/ContextState";

export interface IUseFormDataFieldStateSelectorOptions<F> {
    formField: keyof F;
    stateForm: keyof IContextStateDataForms;
}

export const useFormDataFieldStateSelector = <F>(
    options: IUseFormDataFieldStateSelectorOptions<F>,
) => {
    const { formField, stateForm } = options;

    const formDataField = useContextStateSelector(
        // @ts-expect-error No way to calculate type of the field
        state => state.data.forms[ stateForm ]?.data[ formField ],
    );

    return formDataField;
};

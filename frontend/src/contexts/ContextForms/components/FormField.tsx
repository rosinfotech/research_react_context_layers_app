import {
    useStateSelectorFormDataField,
    useStateSelectorFormErrorsField,
} from "@contexts/ContextState";
import { useContextForms } from "../ContextForms";
import type { IContextFormsProviderState } from "../types";
import type { ChangeEvent, ComponentProps, ElementType } from "react";

interface IFormFieldBaseProps<H extends HTMLInputElement> {
    error?: string;
    onChange?: ( e: ChangeEvent<H> ) => void;
    value?: string | number;
}

type TFormFieldProps<F, C extends ElementType, H extends HTMLInputElement> = {
    Component: C;
    form: keyof IContextFormsProviderState;
    formField: keyof F;
} & IFormFieldBaseProps<H> &
ComponentProps<C>;

export const FormField = <
    F,
    C extends ElementType = ElementType,
    H extends HTMLInputElement = HTMLInputElement,
>(
    props: TFormFieldProps<F, C, H>,
): JSX.Element | null => {
    const { Component, form: formName, formField, ...rest } = props;

    const forms = useContextForms();

    const formDataField = useStateSelectorFormDataField<F>( {
        formField,
        stateForm: formName,
    } );

    const formErrorField = useStateSelectorFormErrorsField<F>( {
        formField,
        stateForm: formName,
    } );

    if ( formDataField === undefined || formDataField === null ) {
        return null;
    }

    const onChange
        = forms[ formName as keyof IContextFormsProviderState ].formFieldOnChangeEventGet( formField );

    return <Component { ...rest } error={ formErrorField } value={ formDataField } onChange={ onChange } />;
};

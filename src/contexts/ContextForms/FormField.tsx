import { useForm } from "./useForm";
import { useFormDataFieldStateSelector } from "./useFormDataFieldStateSelector";
import { useFormErrorsFieldStateSelector } from "./useFormErrorsFieldStateSelector";
import type { IContextFormsProviderState } from "./types";
import type { ChangeEvent, ComponentProps, ElementType } from "react";

interface IFormFieldBaseProps<E extends HTMLInputElement> {
    error?: string;
    onChange?: ( e: ChangeEvent<E> ) => void;
    value?: string | number;
}

type TFormFieldProps<F, C extends ElementType, E extends HTMLInputElement> = {
    Component: C;
    form: keyof IContextFormsProviderState;
    formField: keyof F;
} & IFormFieldBaseProps<E> &
ComponentProps<C>;

type TFormField = <
    F,
    C extends ElementType = ElementType,
    E extends HTMLInputElement = HTMLInputElement,
>(
    props: TFormFieldProps<F, C, E>
) => JSX.Element | null;

export const FormField: TFormField = <
    F,
    C extends ElementType = ElementType,
    E extends HTMLInputElement = HTMLInputElement,
>(
    props: TFormFieldProps<F, C, E>,
) => {
    const { Component, form: formName, formField, ...rest } = props;

    const form = useForm<F>( formName );

    const formDataField = useFormDataFieldStateSelector<F>( {
        formField,
        stateForm: formName,
    } );

    const formErrorField = useFormErrorsFieldStateSelector<F>( {
        formField,
        stateForm: formName,
    } );

    if ( formDataField === undefined || formDataField === null ) {
        return null;
    }

    const onChange = form.onChangeEventGet( formField );

    return <Component { ...rest } error={ formErrorField } value={ formDataField } onChange={ onChange } />;
};

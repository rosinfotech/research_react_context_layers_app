import { type ComponentProps, type ElementType, useCallback } from "react";
import { useForm } from "../hooks/useForm";
import type { IContextFormsProviderState } from "../types";
import type { IStateForm } from "@contexts/ContextState";

interface IFormButtonSubmitBaseProps {
    onClick?: VoidFunction;
}

export type TFormButtonSubmitProps<F, C extends ElementType> = {
    Component: C;
    form: keyof IContextFormsProviderState;
    // TODO Strong dependency with FormContext
    // TODO Validation type
    onSubmitted?: ( validationReturn: boolean | IStateForm<F>["errors"] ) => Promise<void>;
} & IFormButtonSubmitBaseProps &
ComponentProps<C>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type TFormButtonSubmit = <F, E, C extends ElementType = ElementType>(
    props: TFormButtonSubmitProps<F, C>
) => JSX.Element | null;

export const FormButtonSubmit: TFormButtonSubmit = <F, E, C extends ElementType = ElementType>(
    props: TFormButtonSubmitProps<F, C>,
) => {
    const { Component, form: formName, onSubmitted, ...rest } = props;

    const form = useForm<F, E>( formName );

    const onClick = useCallback( () => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        form.onSubmit( onSubmitted );
    }, [ form, onSubmitted ] );

    return <Component { ...rest } onClick={ onClick } />;
};

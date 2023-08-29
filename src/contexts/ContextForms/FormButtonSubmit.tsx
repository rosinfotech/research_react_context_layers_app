import { type ComponentProps, type ElementType, useCallback } from "react";
import { useForm } from "./useForm";
import type { IContextFormsProviderState } from "./types";
import type { IStateForm } from "@contexts/ContextState";

interface IFormButtonSubmitBaseProps {
    onClick?: VoidFunction;
}

export type TFormButtonSubmitProps<F, C extends ElementType, ERT = string> = {
    Component: C;
    form: keyof IContextFormsProviderState;
    // TODO Strong dependency with FormContext
    // TODO Validation type
    onSubmitted?: ( validationReturn: boolean | IStateForm<F, ERT>["errors"] ) => Promise<void>;
} & IFormButtonSubmitBaseProps &
ComponentProps<C>;

export type TFormButtonSubmit = <F, C extends ElementType = ElementType, ERT = string>(
    props: TFormButtonSubmitProps<F, C, ERT>
) => JSX.Element | null;

export const FormButtonSubmit: TFormButtonSubmit = <
    F,
    E,
    C extends ElementType = ElementType,
    ERT = string,
>(
    props: TFormButtonSubmitProps<F, C, ERT>,
) => {
    const { Component, form: formName, onSubmitted, ...rest } = props;

    // TODO form any
    const form = useForm<F, E, ERT>( formName );

    const onClick = useCallback( () => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        form.onSubmit( onSubmitted );
    }, [ form, onSubmitted ] );

    return (
        <Component
            { ...rest }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            onClick={ onClick }
        />
    );
};

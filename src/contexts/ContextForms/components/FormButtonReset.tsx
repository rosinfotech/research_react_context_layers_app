import { type ComponentProps, type ElementType, useCallback } from "react";
import { useForm } from "../hooks/useForm";
import type { IContextFormsProviderState } from "../types";

interface IFormButtonResetBaseProps {
    onClick?: VoidFunction;
}

export type TFormButtonResetProps<C extends ElementType> = {
    Component: C;
    form: keyof IContextFormsProviderState;
} & IFormButtonResetBaseProps &
ComponentProps<C>;

export const FormButtonReset = <F, E, C extends ElementType = ElementType>(
    props: TFormButtonResetProps<C>,
): JSX.Element | null => {
    const { Component, form: formName, ...rest } = props;

    const form = useForm<F, E>( formName );

    const onClick = useCallback( () => {
        form.onReset();
    }, [ form ] );

    return <Component { ...rest } onClick={ onClick } />;
};

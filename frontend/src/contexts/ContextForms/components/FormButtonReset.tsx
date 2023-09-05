import { type ComponentProps, type ElementType, useCallback } from "react";
import { useContextForms } from "../ContextForms";
import type { IContextFormsProviderState } from "../types";

interface IFormButtonResetBaseProps {
    onClick?: VoidFunction;
}

export type TFormButtonResetProps<C extends ElementType> = {
    Component: C;
    form: keyof IContextFormsProviderState;
} & IFormButtonResetBaseProps &
ComponentProps<C>;

export const FormButtonReset = <C extends ElementType = ElementType>(
    props: TFormButtonResetProps<C>,
): JSX.Element | null => {
    const { Component, form: formName, ...rest } = props;

    const forms = useContextForms();

    const onClick = useCallback( () => {
        forms[ formName as keyof IContextFormsProviderState ].onReset();
    }, [ forms, formName ] );

    return <Component { ...rest } onClick={ onClick } />;
};

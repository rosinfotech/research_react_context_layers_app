import { type ComponentProps, type ElementType, useCallback } from "react";
import { useContextForms } from "../ContextForms";
import type { IContextFormsProviderState } from "../types";
import type { IStateForm } from "@contexts/ContextState";

interface IFormButtonSubmitBaseProps {
    onClick?: VoidFunction;
}

export type TFormButtonSubmitProps<F, C extends ElementType> = {
    Component: C;
    form: keyof IContextFormsProviderState;
    // TODO Validation type
    onSubmitted?: ( validationReturn: boolean | IStateForm<F>["errors"] ) => Promise<void>;
} & IFormButtonSubmitBaseProps &
ComponentProps<C>;

export const FormButtonSubmit = <F, C extends ElementType = ElementType>(
    props: TFormButtonSubmitProps<F, C>,
): JSX.Element | null => {
    const { Component, form: formName, onSubmitted, ...rest } = props;

    const forms = useContextForms();

    const onClick = useCallback( () => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        forms[ formName as keyof IContextFormsProviderState ].onSubmit( onSubmitted );
    }, [ forms, formName, onSubmitted ] );

    return <Component { ...rest } onClick={ onClick } />;
};

import { type ComponentProps, type ElementType } from "react";
import { useContextServices } from "../ContextServices";
import type { IUIDialogs } from "@src/types";

export type TServiceUIDialogButtonOpenProps<C extends ElementType> = {
    Component: C;
    dialog: keyof IUIDialogs;
} & ComponentProps<C>;

export type TServiceUIDialogButtonOpen = <C extends ElementType = ElementType>(
    props: TServiceUIDialogButtonOpenProps<C>
) => JSX.Element | null;

export const ServiceUIDialogButtonOpen: TServiceUIDialogButtonOpen = <
    C extends ElementType = ElementType,
>(
    props: TServiceUIDialogButtonOpenProps<C>,
) => {
    const { Component, dialog, ...rest } = props;

    const { serviceUI } = useContextServices();

    return (
        <Component
            { ...rest }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            onClick={ serviceUI.openDialog.bind( null, dialog ) }
        />
    );
};

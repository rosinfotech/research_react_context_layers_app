import { useStateSelectorServiceProperty } from "@contexts/ContextState";
import { ErrorCode } from "@rosinfo.tech/utils";
import type { IUIDialogs } from "@@types";
import { useContextServices } from "../ContextServices";
import type { ComponentProps, ElementType } from "react";

export type TDialogPropsReadyToServiceUIDialog<P> = Omit<P, "onClose" | "open">;

export type TServiceUIDialogProps<C extends ElementType> = {
    Component: C;
    dialog: keyof IUIDialogs;
} & ComponentProps<C>;

export const ServiceUIDialog = <C extends ElementType>(
    props: Omit<TServiceUIDialogProps<C>, "open" | "onClose">,
): JSX.Element | null => {
    const { Component, children, dialog, ...rest } = props;
    const { serviceUI } = useContextServices();

    if ( !dialog ) {
        throw new ErrorCode( "0309231712" );
    }

    const open = useStateSelectorServiceProperty<boolean>( {
        path        : `dialogs.${ dialog }`,
        stateService: "serviceUI",
        valueDefault: false,
    } );

    return (
        <Component { ...rest } open={ !!open } onClose={ serviceUI.closeDialog.bind( null, dialog ) }>
            {children}
        </Component>
    );
};

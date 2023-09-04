import { type ComponentProps, type ElementType, useCallback } from "react";
import { useContextServices } from "../ContextServices";
import type { IUIDialogs } from "@src/types";

export type TServiceUIDialogButtonOpenProps<C extends ElementType> = {
    Component: C;
    dialog: keyof IUIDialogs;
} & ComponentProps<C>;

export const ServiceUIDialogButtonOpen = <C extends ElementType>(
    props: TServiceUIDialogButtonOpenProps<C>,
): JSX.Element | null => {
    const { Component, dialog, onClick: onClickProp, ...rest } = props;

    const { serviceUI } = useContextServices();

    const onClick = useCallback( () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        onClickProp?.();
        serviceUI.openDialog( dialog );
    }, [ dialog, onClickProp, serviceUI ] );

    return <Component { ...rest } onClick={ onClick } />;
};

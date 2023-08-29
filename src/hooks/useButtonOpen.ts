import { createElement, useCallback, useState } from "react";
import type { ButtonProps } from "@mui/material";
import type { FC } from "react";

export const useButtonOpen = <B extends Pick<ButtonProps, "onClick"> = ButtonProps>(
    ButtonComponent: FC<B>,
): [FC<B>, boolean, VoidFunction] => {
    const [ open, openSet ] = useState( false );

    const ButtonComponentHigh = useCallback(
        ( props: B ) => {
            const onClick: B["onClick"] = ( e ) => {
                openSet( _ => !_ );
                props.onClick?.( e );
            };

            return createElement( ButtonComponent, {
                ...props,
                onClick,
            } );
        },
        [ ButtonComponent ],
    );

    const onClose = useCallback( () => {
        openSet( false );
    }, [] );

    return [ ButtonComponentHigh, open, onClose ];
};

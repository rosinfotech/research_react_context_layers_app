import { useStateSelectorServiceProperty } from "@contexts/ContextState";
import { Dialog, type DialogProps } from "@mui/material";
import type { IUIDialogs } from "@@types";
import { useContextServices } from "../ContextServices";
import type { FC } from "react";

export interface IServiceUIDialogProps extends Omit<DialogProps, "onClose" | "open"> {
    dialog: keyof IUIDialogs;
}

export const ServiceUIDialog: FC<IServiceUIDialogProps> = ( props ) => {
    const { children, dialog, ...rest } = props;

    const { serviceUI } = useContextServices();

    const open = useStateSelectorServiceProperty<boolean>( {
        path        : `dialogs.${ dialog }`,
        stateService: "serviceUI",
        valueDefault: false,
    } );

    return (
        <Dialog
            { ...rest }
            open={ !!open }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            onClose={ serviceUI.closeDialog.bind( null, "userCreate" ) }
        >
            {children}
        </Dialog>
    );
};

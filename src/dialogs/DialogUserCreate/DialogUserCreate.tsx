import { ServiceUIDialog, useContextServices } from "@contexts/ContextServices";
import { FormUserCreate } from "@forms/FormUserCreate";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import type { IServiceUIDialogProps } from "@contexts/ContextServices";
import type { FC } from "react";

const DIALOG = "userCreate";

export const DialogUserCreate: FC<Omit<IServiceUIDialogProps, "dialog">> = ( props ) => {
    const { serviceUI } = useContextServices();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const onClose = serviceUI.closeDialog.bind( null, DIALOG );

    return (
        <ServiceUIDialog { ...props } dialog={ DIALOG }>
            <Box
                alignItems="center"
                display="flex"
                flexDirection="row"
                flexWrap="nowrap"
                justifyContent="space-between"
                minWidth={ 600 }
                px={ 2 }
                py={ 0.5 }
            >
                <Typography variant="h5">Creating user</Typography>
                <IconButton color="secondary" onClick={ onClose }>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider />
            <Box px={ 2 } py={ 2 } width="100%">
                <FormUserCreate
                    onSubmitted={ async ( validationReturn ) => {
                        if ( validationReturn === true ) {
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                            onClose();
                        }
                        // TODO Refactor
                        return Promise.resolve();
                    } }
                />
            </Box>
        </ServiceUIDialog>
    );
};

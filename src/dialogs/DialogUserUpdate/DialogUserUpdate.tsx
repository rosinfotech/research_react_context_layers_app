import { ServiceUIDialog, useContextServices } from "@contexts/ContextServices";
import { FormUserUpdate } from "@forms/FormUserUpdate";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Dialog, Divider, IconButton, Typography } from "@mui/material";
import type { FC } from "react";

const DIALOG = "userUpdate";

export const DialogUserUpdate: FC = () => {
    const { serviceUI } = useContextServices();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const onClose = serviceUI.closeDialog.bind( null, DIALOG );

    return (
        <ServiceUIDialog Component={ Dialog } dialog={ DIALOG }>
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
                <Typography variant="h5">Updating user</Typography>
                <IconButton color="secondary" onClick={ onClose }>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider />
            <Box px={ 2 } py={ 2 } width="100%">
                <FormUserUpdate
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

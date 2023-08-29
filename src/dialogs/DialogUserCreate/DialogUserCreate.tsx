import { FormUserCreate } from "@forms/FormUserCreate";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Dialog, type DialogProps, Divider, IconButton, Typography } from "@mui/material";
import type { FC } from "react";

export const DialogUserCreate: FC<DialogProps> = props => (
    <Dialog
        { ...props }
    >
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
            <Typography variant="h5" >
                Creating user
            </Typography>
            <IconButton
                color="secondary"
                onClick={ props.onClose as VoidFunction }
            >
                <CloseIcon />
            </IconButton>
        </Box>
        <Divider />
        <Box
            px={ 2 }
            py={ 2 }
            width="100%"
        >
            <FormUserCreate
                onSubmitted={ async ( validationReturn ) => {
                    if ( validationReturn === true ) {
                        props.onClose?.( {}, "backdropClick" );
                    }
                    return Promise.resolve();
                } }
            />
        </Box>
    </Dialog>
);

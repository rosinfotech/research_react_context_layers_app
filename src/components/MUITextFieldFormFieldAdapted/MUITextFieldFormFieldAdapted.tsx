import { TextField } from "@mui/material";
import { forwardRef } from "react";
import type { TextFieldProps } from "@mui/material";
import type { FC } from "react";

export interface IMUITextFieldErrorAdaptedProps {
    error?: string;
}

export const MUITextFieldFormFieldAdapted: FC<Omit<TextFieldProps, "error"> & IMUITextFieldErrorAdaptedProps> = forwardRef( ( props, ref ) => {
    const { error, ...rest } = props;

    return (
        <TextField
            { ...rest }
            ref={ ref }
            error={ !!error }
            helperText={ !!error ? error : undefined }
        />
    );
} );

MUITextFieldFormFieldAdapted.displayName = "MUITextFieldFormFieldAdapted";

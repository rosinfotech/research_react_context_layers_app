import { MUITextFieldFormFieldAdapted } from "@components/MUITextFieldFormFieldAdapted";
import { FormButtonReset, FormButtonSubmit, FormField } from "@contexts/ContextForms";
import { Box, Button, Divider, Stack } from "@mui/material";
import type { TUserFormUpdate } from "@@types";
import type { TFormButtonSubmitProps } from "@contexts/ContextForms";
import type { FC } from "react";

const FORM = "formUserUpdate";

export const FormUserUpdate: FC<
Pick<TFormButtonSubmitProps<TUserFormUpdate, typeof Button>, "onSubmitted">
> = props => (
    <Stack direction="column" spacing={ 1.5 }>
        <FormField<TUserFormUpdate, typeof MUITextFieldFormFieldAdapted>
            Component={ MUITextFieldFormFieldAdapted }
            form={ FORM }
            formField="login"
            label="Login"
            fullWidth
        />
        <FormField<TUserFormUpdate, typeof MUITextFieldFormFieldAdapted>
            Component={ MUITextFieldFormFieldAdapted }
            form={ FORM }
            formField="email"
            label="Email"
            type="email"
            fullWidth
        />
        <FormField<TUserFormUpdate, typeof MUITextFieldFormFieldAdapted>
            Component={ MUITextFieldFormFieldAdapted }
            form={ FORM }
            formField="name"
            label="Name"
            fullWidth
        />
        <FormField<TUserFormUpdate, typeof MUITextFieldFormFieldAdapted>
            Component={ MUITextFieldFormFieldAdapted }
            form={ FORM }
            formField="surname"
            label="Surname"
            fullWidth
        />
        <Box py={ 2 } width="100%">
            <Divider />
        </Box>
        <Box
            alignContent="center"
            display="flex"
            flexDirection="row"
            flexWrap="nowrap"
            justifyContent="flex-start"
            width="100%"
        >
            <FormButtonReset<typeof Button>
                Component={ Button }
                color="primary"
                form={ FORM }
                fullWidth
            >
                Reset
            </FormButtonReset>
            <FormButtonSubmit<TUserFormUpdate, typeof Button>
                Component={ Button }
                color="primary"
                form={ FORM }
                fullWidth
                onSubmitted={ props.onSubmitted }
            >
                Update
            </FormButtonSubmit>
        </Box>
    </Stack>
);

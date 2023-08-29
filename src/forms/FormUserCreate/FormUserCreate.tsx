import { MUITextFieldFormFieldAdapted } from "@components/MUITextFieldFormFieldAdapted";
import { FormButtonSubmit, FormField } from "@contexts/ContextForms";
import { Box, Button, Divider, Stack } from "@mui/material";
import type { IUserFormCreate } from "@@types";
import type { TFormButtonSubmitProps } from "@contexts/ContextForms";
import type { FC } from "react";

// TODO Naming same in FormContext
export const FormUserCreate: FC<Pick<TFormButtonSubmitProps<IUserFormCreate, typeof Button>, "onSubmitted">> = props => (
    <Stack
        direction="column"
        spacing={ 1.5 }
    >
        <FormField<IUserFormCreate, typeof MUITextFieldFormFieldAdapted>
            Component={ MUITextFieldFormFieldAdapted }
            form="userCreate"
            formField="login"
            label="Login"
            fullWidth
        />
        <FormField<IUserFormCreate, typeof MUITextFieldFormFieldAdapted>
            Component={ MUITextFieldFormFieldAdapted }
            form="userCreate"
            formField="email"
            label="Email"
            type="email"
            fullWidth
        />
        <FormField<IUserFormCreate, typeof MUITextFieldFormFieldAdapted>
            Component={ MUITextFieldFormFieldAdapted }
            form="userCreate"
            formField="name"
            label="Name"
            fullWidth
        />
        <FormField<IUserFormCreate, typeof MUITextFieldFormFieldAdapted>
            Component={ MUITextFieldFormFieldAdapted }
            form="userCreate"
            formField="surname"
            label="Surname"
            fullWidth
        />
        <Box py={ 2 } width="100%">
            <Divider />
        </Box>
        <FormField<IUserFormCreate, typeof MUITextFieldFormFieldAdapted>
            Component={ MUITextFieldFormFieldAdapted }
            form="userCreate"
            formField="password"
            label="Password"
            fullWidth
        />
        <FormField<IUserFormCreate, typeof MUITextFieldFormFieldAdapted>
            Component={ MUITextFieldFormFieldAdapted }
            form="userCreate"
            formField="passwordConfirm"
            label="Password confirm"
            fullWidth
        />
        <Box py={ 2 } width="100%">
            <Divider />
        </Box>
        <FormButtonSubmit<IUserFormCreate, typeof Button>
            Component={ Button }
            color="primary"
            form="userCreate"
            onSubmitted={ props.onSubmitted }
        >
            Create
        </FormButtonSubmit>
    </Stack>
);


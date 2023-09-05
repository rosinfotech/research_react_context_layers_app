import { MUITextFieldFormFieldAdapted } from "@components/MUITextFieldFormFieldAdapted";
import { FormButtonReset, FormButtonSubmit, FormField } from "@contexts/ContextForms";
import { Box, Button, Divider, Stack } from "@mui/material";
import type { IUserFormCreate } from "@@types";
import type { TFormButtonSubmitProps } from "@contexts/ContextForms";
import type { FC } from "react";

export const FormUserCreate: FC<
Pick<TFormButtonSubmitProps<IUserFormCreate, typeof Button>, "onSubmitted">
> = props => (
    <Stack direction="column" spacing={ 1.5 }>
        <FormField<IUserFormCreate, typeof MUITextFieldFormFieldAdapted>
            Component={ MUITextFieldFormFieldAdapted }
            form="formUserCreate"
            formField="login"
            label="Login"
            fullWidth
        />
        <FormField<IUserFormCreate, typeof MUITextFieldFormFieldAdapted>
            Component={ MUITextFieldFormFieldAdapted }
            form="formUserCreate"
            formField="email"
            label="Email"
            type="email"
            fullWidth
        />
        <FormField<IUserFormCreate, typeof MUITextFieldFormFieldAdapted>
            Component={ MUITextFieldFormFieldAdapted }
            form="formUserCreate"
            formField="name"
            label="Name"
            fullWidth
        />
        <FormField<IUserFormCreate, typeof MUITextFieldFormFieldAdapted>
            Component={ MUITextFieldFormFieldAdapted }
            form="formUserCreate"
            formField="surname"
            label="Surname"
            fullWidth
        />
        <Box py={ 2 } width="100%">
            <Divider />
        </Box>
        <FormField<IUserFormCreate, typeof MUITextFieldFormFieldAdapted>
            Component={ MUITextFieldFormFieldAdapted }
            form="formUserCreate"
            formField="password"
            label="Password"
            fullWidth
        />
        <FormField<IUserFormCreate, typeof MUITextFieldFormFieldAdapted>
            Component={ MUITextFieldFormFieldAdapted }
            form="formUserCreate"
            formField="passwordConfirm"
            label="Password confirm"
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
                form="formUserCreate"
                fullWidth
            >
                Reset
            </FormButtonReset>
            <FormButtonSubmit<IUserFormCreate, typeof Button>
                Component={ Button }
                color="primary"
                form="formUserCreate"
                fullWidth
                onSubmitted={ props.onSubmitted }
            >
                Create
            </FormButtonSubmit>
        </Box>
    </Stack>
);

import { useEffect } from "react";
import { useContextForms } from "./ContextForms";
import type { FormAbstract } from "./forms";
import type { IContextFormsProviderState } from "./types";

export const useForm = <F, E, ERT = string> ( form: keyof IContextFormsProviderState ) => {
    const forms = useContextForms();

    useEffect(
        () => {
            forms[ form ].initialValues();
        },
        [ forms, form ],
    );

    return forms[ form ] as unknown as FormAbstract<F, E, ERT>;
};

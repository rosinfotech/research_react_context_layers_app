import { useEffect } from "react";
import { useContextForms } from "../ContextForms";
import type { FormAbstract } from "../forms";
import type { IContextFormsProviderState } from "../types";

// TODO not sure that need
export const useForm = <F, E>( form: keyof IContextFormsProviderState ) => {
    const forms = useContextForms();

    useEffect( () => {
        forms[ form ].valuesInitialSet();
    }, [ forms, form ] );

    return forms[ form ] as unknown as FormAbstract<F, E>;
};

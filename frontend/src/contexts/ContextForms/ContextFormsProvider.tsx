import { type FC, type PropsWithChildren } from "react";
import { ContextForms, contextFormsInitialValue } from "./ContextForms";
import { ContextFormsInit } from "./ContextFormsInit";

export const ContextFormsProvider: FC<PropsWithChildren> = ( { children } ) => (
    <ContextForms.Provider value={ contextFormsInitialValue }>
        <ContextFormsInit />
        {children}
    </ContextForms.Provider>
);

import { createContext, useContext } from "react";
import { FormUserCreate, FormUserUpdate } from "./forms";
import type { IContextFormsProviderState, TContextFormsValue } from "./types";

const contextFormsInitialState: IContextFormsProviderState = {
    formUserCreate: new FormUserCreate(),
    formUserUpdate: new FormUserUpdate(),
};

export const contextFormsInitialValue: IContextFormsProviderState = {
    ...contextFormsInitialState,
};

export const ContextForms = createContext<TContextFormsValue>( contextFormsInitialValue );

export function useContextForms (): TContextFormsValue {
    return useContext( ContextForms );
}

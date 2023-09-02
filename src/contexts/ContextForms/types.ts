import type { FormUserCreate } from "./forms";

export interface IContextFormsProviderState {
    formUserCreate: FormUserCreate;
}

export type TContextFormsValue = IContextFormsProviderState;

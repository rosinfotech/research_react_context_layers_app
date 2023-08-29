import type { FormUserCreate } from "./forms";

export interface IContextFormsProviderState {
    userCreate: FormUserCreate;
}

export type TContextFormsValue = IContextFormsProviderState;

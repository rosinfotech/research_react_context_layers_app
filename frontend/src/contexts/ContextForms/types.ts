import type { FormUserCreate, FormUserUpdate } from "./forms";

export interface IContextFormsProviderState {
    formUserCreate: FormUserCreate;
    formUserUpdate: FormUserUpdate;
}

export type TContextFormsValue = IContextFormsProviderState;

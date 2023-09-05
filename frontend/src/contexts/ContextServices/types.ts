import type { ServiceUI } from "./services/ServiceUI";

export interface IContextServicesProviderState {
    serviceUI: ServiceUI;
}

export type TContextServicesValue = IContextServicesProviderState;

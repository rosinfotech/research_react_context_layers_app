import type { AxiosInstance } from "axios";

export interface IContextAPIProviderState {
    baseUrl: string;
}

export interface IContextAPIValue extends IContextAPIProviderState {
    api: AxiosInstance;
}

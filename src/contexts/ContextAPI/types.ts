import type { AxiosInstance, AxiosResponse } from "axios";

export interface IContextAPIProviderState {
    baseUrl: string;
}

export type TAPI = AxiosInstance;

export interface IContextAPIValue extends IContextAPIProviderState {
    api: TAPI | null;
}

export type TResponseArrayEntity<D> = Array<D>;

export type TResponseEntity<D> = AxiosResponse<D>;

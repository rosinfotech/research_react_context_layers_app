import { isObject } from "@rosinfo.tech/utils";
import type { IUI, IUser, IUserFormCreate } from "@@types";
import type { ContextStateFacade } from "./ContextStateFacade";

export type TId = string;

export type TParamsString = string;

export type TEntitiesList = Array<TId>;

export interface IDataProcessing<D> {
    data: D | null;
    error?: unknown;
    isError?: boolean;
    isFetched?: boolean;
    isFetching?: boolean;
    isOutdated?: boolean;
    timestamp: number;
}

export interface IPage {
    [page: string]: TEntitiesList;
}

export type TDPEntitiesLists = Record<TParamsString, IDataProcessing<TEntitiesList>>;

export type TDPPages = Record<TParamsString, IDataProcessing<IPage>>;

export type TDPEntities<D> = Record<string, IDataProcessing<D>>;

export interface IStateRepository<D> {
    entities: TDPEntities<D>;
    lists: TDPEntitiesLists;
    pages: TDPPages;
}

export type TDPStateRepository<D> = IDataProcessing<IStateRepository<D>>;

interface ISubmittedForm<F> {
    data: F;
    timestamp: number;
}

export interface IStateForm<F> {
    data: F;
    errors:
    | {
        [k in keyof F]?: string;
    }
    | null;
    isSubmitting: boolean;
    submitted: Array<ISubmittedForm<F>>;
    touched: {
        [k in keyof F]?: boolean;
    };
}

export interface IContextStateDataForms {
    formUserCreate: IStateForm<IUserFormCreate> | null;
    formUserUpdate: IStateForm<IUserFormCreate> | null;
}

export interface IContextStateDataRepositories {
    repositoryUsers: TDPStateRepository<IUser> | null;
}

export interface IContextStateDataServices {
    serviceUI: IUI | null;
}

export interface IContextStateData {
    forms: IContextStateDataForms;
    repositories: IContextStateDataRepositories;
    services: IContextStateDataServices;
}

export type TDataSet = ( stateNext: Partial<IContextStateData> ) => void;

export type TDataGet = () => IContextStateData;

export interface IContextStateValue {
    data: IContextStateData;
    dataGet: TDataGet | null;
    dataSet: TDataSet | null;
    stateFacade: ContextStateFacade | null;
}

export const isDataProcessing = <D>( value: unknown ): value is IDataProcessing<D> => !!value
    && isObject( value )
    && "data" in value
    && "error" in value
    && "isError" in value
    && "isFetched" in value
    && "isFetching" in value
    && "timestamp" in value;

export const isIStateRepository = <D>( value: unknown ): value is IStateRepository<D> => !!value && isObject( value ) && "entities" in value && "lists" in value && "pages" in value;

export const isTDPStateRepository = <D>( value: unknown ): value is TDPStateRepository<D> => !!value && isDataProcessing( value ) && isObject( value.data ) && isIStateRepository( value.data );

import { isObject } from "@rosinfo.tech/utils";
import type { IUser } from "@@types";
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

export interface IContextStateProviderState {
    repositoryUsers: TDPStateRepository<IUser> | null;
}

export type TDataSet = ( stateNext: Partial<IContextStateProviderState> ) => void;

export type TDataGet = () => IContextStateProviderState;

export interface IContextStateValue {
    contextStateFacade: ContextStateFacade | null;
    data: IContextStateProviderState;
    dataGet: TDataGet | null;
    dataSet: TDataSet | null;
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

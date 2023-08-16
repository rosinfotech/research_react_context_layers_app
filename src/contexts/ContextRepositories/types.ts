import type { RepositoryUsers } from "./repositories";

export interface IContextRepositoriesProviderState {
    repositoryUsers: RepositoryUsers;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IContextRepositoriesValue extends IContextRepositoriesProviderState {}

export interface IUser {
    deleted: boolean;
    email: string;
    id: string;
    login: string;
    name: string;
    password: string;
    surname: string;
    timestampCreate: number;
    timestampUpdate: number;
}

export type TUserFormUpdate = Omit<IUser, "id" | "deleted" | "timestampCreate" | "timestampUpdate">;

export interface IUserFormCreate extends TUserFormUpdate {
    passwordConfirm: string;
}

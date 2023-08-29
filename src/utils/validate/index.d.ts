/* eslint-disable @typescript-eslint/naming-convention */
export type Entries<T> = Array<
{
    [K in keyof T]: [K, T[K]];
}[keyof T]
>;

export type Full<T> = {
    [P in keyof T]-?: Full<T[P]>;
};

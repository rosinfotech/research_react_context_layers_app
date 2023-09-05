/* eslint-disable */
type Entries<T> = Array<
    {
        [K in keyof T]: [K, T[K]];
    }[keyof T]
>;

type Full<T> = {
    [P in keyof T]-?: Full<T[P]>;
};

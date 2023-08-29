export const isObjectPlain = <T extends object>( value: unknown ): value is T => !!value && value.constructor === Object;

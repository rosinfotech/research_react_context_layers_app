// TODO No reason to do this explicity
export * from "./index.d";

export type TValidator =
    | "Function"
    | "Equal"
    | "LengthMax"
    | "LengthMin"
    | "NotNull"
    | "RegExp"
    | "Required";
    // | "NotEmpty"
    // | "LessThan"
    // | "MoreThan";

export interface IValidatorConfigInternal <I extends object> {
    message?: string;
    name?: keyof I;
    value?: I[keyof I];
}

export interface IValidatorConfigBase {
    test?: unknown;
    validator: TValidator;
}

export interface IValidatorConfigBaseTrue extends IValidatorConfigBase {
    test: true;
    validator: TValidator;
}

export interface IValidatorConfigBaseNumber extends IValidatorConfigBase {
    test: number;
    validator: TValidator;
}

export interface IValidatorConfigBaseFunction extends IValidatorConfigBase {
    test: ( value: unknown ) => ( string | true );
    validator: TValidator;
}

export type TValidatorsMap <I extends object, VRS extends IValidatorConfigBase> = {
    [ VR in VRS as VR["validator"] ]: VR["test"] | Omit<VR, "validator"> & IValidatorConfigInternal<I>;
};

export interface IValidatorFunctionOptions extends IValidatorConfigBaseFunction {
    validator: "Function";
}

export interface IValidatorEqualOptions extends IValidatorConfigBase {
    test: {
        name: string;
        value: unknown;
    };
    validator: "Equal";
}

export interface IValidatorLengthMaxOptions extends IValidatorConfigBaseNumber {
    validator: "LengthMax";
}

export interface IValidatorLengthMinOptions extends IValidatorConfigBaseNumber {
    validator: "LengthMin";
}

export interface IValidatorNotNullOptions extends IValidatorConfigBaseTrue {
    validator: "NotNull";
}

export interface IValidatorRegExpOptions extends IValidatorConfigBase {
    test: RegExp;
    validator: "RegExp";
}

export interface IValidatorRequiredOptions extends IValidatorConfigBaseTrue {
    validator: "Required";
}

export type TValidatorsMapValues<I extends object> = Partial<TValidatorsMap<I,
| IValidatorFunctionOptions
| IValidatorEqualOptions
| IValidatorLengthMaxOptions
| IValidatorLengthMinOptions
| IValidatorNotNullOptions
| IValidatorRegExpOptions
| IValidatorRequiredOptions
>>;

export type TValidateReturn <I> = Record<keyof I, string> | true;

export interface IValidateOptions <I extends object> {
    scheme: {
        [k in keyof I]?: TValidatorsMapValues<I>;
    };
    values: I;
}

export type TValidatorOptions<I extends object> = Omit<IValidatorConfigBase & IValidatorConfigInternal<I>, "validator">;

export type TValidatorMap<I extends object> = Partial<Record<TValidator, ( options: TValidatorOptions<I> ) => string | true>>;

export interface IReplaceMessageOptions {
    __NAME__?: unknown;
    __TEST__?: unknown;
    __VALUE__?: unknown;
    message: string;
}

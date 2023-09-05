import { validatorEqual } from "./validatorEqual";
import { validatorFunction } from "./validatorFunction";
import { validatorLengthMax } from "./validatorLengthMax";
import { validatorLengthMin } from "./validatorLengthMin";
import { validatorNotNull } from "./validatorNotNull";
import { validatorRegExp } from "./validatorRegExp";
import { validatorRequired } from "./validatorRequired";

export const validatorMap = {
    Equal    : validatorEqual,
    Function : validatorFunction,
    LengthMax: validatorLengthMax,
    LengthMin: validatorLengthMin,
    NotNull  : validatorNotNull,
    RegExp   : validatorRegExp,
    Required : validatorRequired,
};

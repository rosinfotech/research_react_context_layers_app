import { stringReplaceWithKeyValue } from "@rosinfo.tech/utils";
import type { IReplaceMessageOptions } from "./types";

export const replaceMessage = ( options: IReplaceMessageOptions ) => {
    const {
        message,
        ...rest
    } = options;

    return stringReplaceWithKeyValue( message, rest );
};

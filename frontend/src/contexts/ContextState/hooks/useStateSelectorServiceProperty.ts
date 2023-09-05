import { type IContextStateDataServices, useContextStateSelector } from "@contexts/ContextState";
import { get } from "@utils/get";

export interface IUseStateSelectorServicePropertyOptions<PT = unknown> {
    path: string;
    stateService: keyof IContextStateDataServices;
    valueDefault: PT;
}

export const useStateSelectorServiceProperty = <PT = unknown>(
    options: IUseStateSelectorServicePropertyOptions<PT>,
) => {
    const { path, stateService, valueDefault } = options;

    const serviceProperty = useContextStateSelector( ( state ) => {
        if ( !state.data.services[ stateService ] ) {
            return valueDefault;
        }

        // @ts-expect-error Not null
        return get( state.data.services[ stateService ], path );
    } );

    return serviceProperty as PT;
};

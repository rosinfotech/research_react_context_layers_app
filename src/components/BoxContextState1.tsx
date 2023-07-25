import { useContextStateSelector } from "@contexts/ContextState/ContextState";
import { Box } from "@mui/material";
import { useColorizeRender } from "@rosinfo.tech/utils/useColorizeRender";
import { type FC, useCallback } from "react";

const CURSOR_SX = { cursor: "pointer" };

export const BoxContextState1: FC = () => {
    const state1 = useContextStateSelector( state => state.state1 );
    const contextStateStateSet = useContextStateSelector( state => state.contextStateStateSet );
    const { colorizeRenderRef } = useColorizeRender( { name: "ButtonContextState1" } );

    const onClick = useCallback( () => {
        contextStateStateSet( {
            state1: state1 + 1,
        } );
    }, [ contextStateStateSet, state1 ] );

    return (
        <Box ref={ colorizeRenderRef } sx={ CURSOR_SX } width="100%" onClick={ onClick }>
            Click me! BoxContextState.state1 &lt;{state1}&gt;
        </Box>
    );
};

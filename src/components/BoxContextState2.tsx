import { useContextStateSelector } from "@contexts/ContextState/ContextState";
import { Box } from "@mui/material";
import { useColorizeRender } from "@rosinfo.tech/utils/useColorizeRender";
import { type FC, useCallback } from "react";

const CURSOR_SX = { cursor: "pointer" };

export const BoxContextState2: FC = () => {
    const state2 = useContextStateSelector( state => state.state2 );
    const contextStateStateSet = useContextStateSelector( state => state.contextStateStateSet );
    const { colorizeRenderRef } = useColorizeRender( { name           : "ButtonContextState2",
        withNodesNested: true } );

    const onClick = useCallback( () => {
        contextStateStateSet( {
            state2: state2 + 1,
        } );
    }, [ contextStateStateSet, state2 ] );

    return (
        <Box ref={ colorizeRenderRef } sx={ CURSOR_SX } width="100%" onClick={ onClick }>
            Click me! BoxContextState.state2 &lt;{state2}&gt;
        </Box>
    );
};

import { Box } from "@mui/material";
import { useColorizeRender } from "@rosinfo.tech/utils/useColorizeRender";
import type { FC } from "react";

interface IBoxNameProps {
    name: string;
}

export const BoxName: FC<IBoxNameProps> = ( props ) => {
    const { name } = props;
    const { colorizeRenderRef } = useColorizeRender( { name: `BoxName <${ name }>` } );

    return (
        <Box ref={ colorizeRenderRef } width="100%">
            BoxName &lt;{name}&gt;
        </Box>
    );
};

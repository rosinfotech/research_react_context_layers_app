import { RepositoryViewList, useContextRepositories } from "@contexts/ContextRepositories";
import { DialogUserCreate } from "@dialogs/DialogUserCreate";
import { useButtonOpen } from "@hooks";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, IconButton } from "@mui/material";
import { BoxStyledRendererUser, UserRenderer } from "@renderers/RendererUser";
import { useColorizeRender } from "@rosinfo.tech/react";
import type { IUser } from "@src/types";
import type { FC } from "react";

export const PageIndex: FC = () => {
    const { repositoryUsers } = useContextRepositories();

    const { colorizeRenderRef } = useColorizeRender( {
        name           : `Add user`,
        withNodesNested: false,
    } );

    const [ IconButtonOpen, open, onClose ] = useButtonOpen( IconButton );

    return (
        <>
            <Box
                alignContent="flex-start"
                alignItems="flex-start"
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                height="100%"
                justifyContent="flex-start"
                width="100%"
            >
                <RepositoryViewList<IUser>
                    ReactElementRenderer={ UserRenderer }
                    repository={ repositoryUsers }
                />
                <BoxStyledRendererUser ref={ colorizeRenderRef }>
                    <IconButtonOpen size="large">
                        <AddCircleIcon />
                    </IconButtonOpen>
                </BoxStyledRendererUser>
            </Box>
            <DialogUserCreate open={ open } onClose={ onClose } />
        </>
    );
};

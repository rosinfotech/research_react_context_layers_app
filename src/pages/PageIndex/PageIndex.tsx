import { RepositoryViewList, useContextRepositories } from "@contexts/ContextRepositories";
import { ServiceUIDialogButtonOpen } from "@contexts/ContextServices";
import { DialogUserCreate } from "@dialogs/DialogUserCreate";
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
                    <ServiceUIDialogButtonOpen<typeof IconButton>
                        Component={ IconButton }
                        dialog="userCreate"
                        size="large"
                    >
                        <AddCircleIcon />
                    </ServiceUIDialogButtonOpen>
                </BoxStyledRendererUser>
            </Box>
            <DialogUserCreate />
        </>
    );
};

import { UserRenderer } from "@components/UserRenderer";
import { RepositoryViewListEntities, useContextRepositories } from "@contexts/ContextRepositories";
import { Box } from "@mui/material";
import type { IUser } from "@src/types";
import type { FC } from "react";

export const Page: FC = () => {
    const { repositoryUsers } = useContextRepositories();

    return (
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
            <RepositoryViewListEntities<IUser>
                ReactElementRenderer={ UserRenderer }
                repositoryClass={ repositoryUsers }
            />
        </Box>
    );
};

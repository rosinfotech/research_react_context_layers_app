import { useContextRepositories } from "@contexts/ContextRepositories";
import { type TId, useContextStateSelector } from "@contexts/ContextState";
import CancelIcon from "@mui/icons-material/Cancel";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { useColorizeRender } from "@rosinfo.tech/react";
import { ErrorCode } from "@rosinfo.tech/utils";
import type { SxProps } from "@mui/material";
import type { FC } from "react";

interface IUserRendererProps {
    id: TId;
}

const sxMarginPaddingNo: SxProps = {
    margin : 0,
    padding: 0,
};

export const UserRenderer: FC<IUserRendererProps> = ( props ) => {
    const { id } = props;

    const { colorizeRenderRef } = useColorizeRender( {
        name           : `User <${ id }>`,
        withNodesNested: false,
    } );

    const user = useContextStateSelector(
        state => state.data.repositoryUsers?.data?.entities[ id ]?.data,
    );

    const { repositoryUsers } = useContextRepositories();

    if ( !user ) {
        return null;
    }

    return (
        <Box
            ref={ colorizeRenderRef }
            alignContent="center"
            alignItems="center"
            display="flex"
            flexDirection="column"
            flexWrap="unset"
            height={ 128 }
            justifyContent="center"
            m={ 1 }
            overflow="hidden"
            p={ 0.5 }
            width={ 128 }
        >
            <Avatar sx={ sxMarginPaddingNo }>{user.login.split( "" )[ 0 ].toLocaleUpperCase()}</Avatar>
            <Typography component={ Box } sx={ sxMarginPaddingNo }>
                {user.login}
            </Typography>
            <IconButton
                component={ Box }
                sx={ sxMarginPaddingNo }
                onClick={ () => {
                    repositoryUsers.entityDelete( id ).catch( ( e ) => {
                        throw new ErrorCode( "1608231319", e );
                    } );
                } }
            >
                <CancelIcon />
            </IconButton>
        </Box>
    );
};

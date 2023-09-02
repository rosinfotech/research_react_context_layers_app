import { useContextRepositories } from "@contexts/ContextRepositories";
import { type TId, useContextStateSelector } from "@contexts/ContextState";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Box, IconButton, Stack, Typography, styled } from "@mui/material";
import { useColorizeRender } from "@rosinfo.tech/react";
import { ErrorCode } from "@rosinfo.tech/utils";
import { type FC, memo } from "react";
import type { SxProps } from "@mui/material";

interface IUserRendererProps {
    id: TId;
}

const sxMarginPaddingNo: SxProps = {
    margin : 0,
    padding: 0,
};

export const BoxStyledRendererUser = styled( Box )( {
    alignContent  : "center",
    alignItems    : "center",
    display       : "flex",
    flexDirection : "column",
    flexWrap      : "unset",
    height        : 128,
    justifyContent: "center",
    margin        : 10,
    overflow      : "hidden",
    padding       : 5,
    width         : 128,
} );

export const UserRenderer: FC<IUserRendererProps> = memo( ( props ) => {
    const { id } = props;

    const { colorizeRenderRef } = useColorizeRender( {
        name           : `User <${ id }>`,
        withNodesNested: false,
    } );

    const user = useContextStateSelector(
        state => state.data.repositories.repositoryUsers?.data?.entities[ id ]?.data,
    );

    const { repositoryUsers } = useContextRepositories();

    if ( !user ) {
        return null;
    }

    return (
        <BoxStyledRendererUser ref={ colorizeRenderRef }>
            <Avatar sx={ sxMarginPaddingNo }>{user.login.split( "" )[ 0 ].toLocaleUpperCase()}</Avatar>
            <Typography component={ Box } sx={ sxMarginPaddingNo }>
                {user.id}
            </Typography>
            <Typography component={ Box } sx={ sxMarginPaddingNo }>
                {user.login}
            </Typography>
            <Stack direction="row" spacing={ 1 }>
                <IconButton
                    component={ Box }
                    sx={ sxMarginPaddingNo }
                    onClick={ () => {
                        repositoryUsers.delete( id ).catch( ( e ) => {
                            throw new ErrorCode( "1608231319", e );
                        } );
                    } }
                >
                    <CancelIcon />
                </IconButton>
                <IconButton
                    component={ Box }
                    sx={ sxMarginPaddingNo }
                    onClick={ () => {
                        console.log();
                    } }
                >
                    <EditIcon />
                </IconButton>
            </Stack>
        </BoxStyledRendererUser>
    );
} );

UserRenderer.displayName = "UserRenderer";

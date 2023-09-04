import { useContextForms } from "@contexts/ContextForms";
import { useContextRepositories } from "@contexts/ContextRepositories";
import { ServiceUIDialogButtonOpen } from "@contexts/ContextServices";
import { type TId, useStateSelectorRepositoryEntity } from "@contexts/ContextState";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Box, IconButton, Stack, Typography, styled } from "@mui/material";
import { useColorizeRender } from "@rosinfo.tech/react";
import { type FC, memo, useCallback } from "react";
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

    const user = useStateSelectorRepositoryEntity( {
        id,
        stateRepository: "repositoryUsers",
    } );

    const { formUserUpdate } = useContextForms();

    const { repositoryUsers } = useContextRepositories();

    const onClickDelete = useCallback( () => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        repositoryUsers.delete( id );
    }, [ id, repositoryUsers ] );

    const onClickEdit = useCallback( () => {
        formUserUpdate.entityId = id;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        formUserUpdate.valuesInitialSet( true );
    }, [ id, formUserUpdate ] );

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
                <IconButton component={ Box } sx={ sxMarginPaddingNo } onClick={ onClickDelete }>
                    <CancelIcon />
                </IconButton>
                <ServiceUIDialogButtonOpen<typeof IconButton<typeof Box>>
                    Component={ IconButton }
                    component={ Box }
                    dialog="userUpdate"
                    size="large"
                    sx={ sxMarginPaddingNo }
                    onClick={ onClickEdit }
                >
                    <EditIcon />
                </ServiceUIDialogButtonOpen>
            </Stack>
        </BoxStyledRendererUser>
    );
} );

UserRenderer.displayName = "UserRenderer";

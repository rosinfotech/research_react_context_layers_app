import { type FC, useEffect } from "react";
import { useContextServices } from "./ContextServices";

export const ContextServicesInit: FC = () => {
    const { serviceUI } = useContextServices();

    useEffect( () => {
        serviceUI.isInitializedException();
    }, [ serviceUI ] );

    return null;
};

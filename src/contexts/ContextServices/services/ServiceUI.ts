import type { IUI, IUIDialogs } from "@@types";
import { ServiceAbstract } from "./ServiceAbstract";
import type { IContextStateDataServices } from "@contexts/ContextState";

export class ServiceUI extends ServiceAbstract<IUI> {

    protected stateService: keyof IContextStateDataServices = "serviceUI";

    constructor () {
        super();
        this.closeDialog = this.closeDialog.bind( this );
        this.openDialog = this.openDialog.bind( this );
    }

    public valuesInitialGet () {
        return {
            dialogs: {
                userCreate: false,
                userUpdate: false,
            },
        };
    }

    public closeDialog ( dialog: keyof IUIDialogs ) {
        this.isInitializedException();

        this.stateFacade?.servicePropertyValueSet( {
            path        : `dialogs.${ dialog }`,
            stateService: "serviceUI",
            value       : false,
        } );
    }

    public openDialog ( dialog: keyof IUIDialogs ) {
        this.isInitializedException();

        this.stateFacade?.servicePropertyValueSet( {
            path        : `dialogs.${ dialog }`,
            stateService: "serviceUI",
            value       : true,
        } );
    }

}

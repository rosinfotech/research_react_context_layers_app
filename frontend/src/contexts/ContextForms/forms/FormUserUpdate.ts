import { validate } from "@utils/validate";
import type { IUser, TUserFormUpdate } from "@@types";
import { FormAbstract } from "./FormAbstract";
import type { IContextStateDataForms, IContextStateDataRepositories } from "@contexts/ContextState";

export class FormUserUpdate extends FormAbstract<TUserFormUpdate, IUser> {

    public stateForm: keyof IContextStateDataForms = "formUserUpdate";

    public stateRepository: keyof IContextStateDataRepositories = "repositoryUsers";

    public valuesInitialEmptyGet () {
        return {
            email   : "",
            login   : "",
            name    : "",
            password: "",
            surname : "",
        };
    }

    public valuesInitialGet () {
        return this.valuesInitialFromEntityGet();
    }

    public isValid ( formData: TUserFormUpdate ) {
        return validate( {
            scheme: {
                email: {
                    RegExp: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                },
                login: {
                    LengthMin: 3,
                },
            },
            values: formData,
        } );
    }

}

import { validate } from "@utils/validate";
import type { IUser, IUserFormCreate } from "@@types";
import { FormAbstract } from "./FormAbstract";
import type { IContextStateDataForms } from "@contexts/ContextState";

export class FormUserCreate extends FormAbstract<IUserFormCreate, IUser> {

    protected stateForm: keyof IContextStateDataForms = "formUserCreate";

    public valuesInitialEmptyGet () {
        return {
            email          : "",
            login          : "",
            name           : "",
            password       : "",
            passwordConfirm: "",
            surname        : "",
        } as IUserFormCreate;
    }

    public valuesInitialGet () {
        const dateCurrent = new Date();
        const prefix = [
            dateCurrent.getDay(),
            dateCurrent.getMonth(),
            dateCurrent.getFullYear(),
            dateCurrent.getHours(),
            dateCurrent.getMinutes(),
        ].join( "" );
        return {
            email          : `email${ prefix }@email${ prefix }.com`,
            login          : `login${ prefix }`,
            name           : `name${ prefix }`,
            password       : prefix,
            passwordConfirm: prefix,
            surname        : `surname${ prefix }`,
        } as IUserFormCreate;
    }

    public formDataToEntityAdapter ( data: IUserFormCreate ) {
        const { email, login, surname } = data;

        return {
            email,
            login,
            surname,
        } as IUser;
    }

    public isValid ( formData: IUserFormCreate ) {
        return validate( {
            scheme: {
                email: {
                    RegExp: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                },
                login: {
                    LengthMin: 3,
                },
                password: {
                    LengthMin: 6,
                },
                passwordConfirm: {
                    Equal: {
                        test: {
                            name : "password",
                            value: formData.password,
                        },
                    },
                    Required: true,
                },
            },
            values: formData,
        } );
    }

}

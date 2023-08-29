import { validate } from "@utils/validate";
import type { IUser, IUserFormCreate } from "@@types";
import { FormAbstract } from "./FormAbstract";

export class FormUserCreate extends FormAbstract<IUserFormCreate, IUser> {

    constructor () {
        super( {
            stateForm: "userCreate",
        } );
    }

    public initialValuesGet = () => ( {
        email          : "",
        login          : "",
        name           : "",
        password       : "",
        passwordConfirm: "",
        surname        : "",
    } as IUserFormCreate );

    public formDataToEntityAdapter ( data: IUserFormCreate ) {
        const {
            email,
            login,
            surname,
        } = data;

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

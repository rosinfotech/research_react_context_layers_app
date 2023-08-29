[![rosinfo.tech](https://cdn.rosinfo.tech/id/logo/id_logo_width_160.svg "rosinfo.tech")](https://rosinfo.tech)

# Changelog

## [ 0.0.4 - 0.0.6 ] - 2023-08-30

- @contexts/ContextForms:

  ```text

  ErrorBoundary

      ContextEnvs

          ContextState

              ContextAPI

                  ContextServices

                      ContextRepositories

                        ContextForms

  ```

  - ./forms/FormAbstract;
  - ./forms/FormUserCreate;
  - ./useForm;
  - ./useFormDataFieldStateSelector;
  - ./useFormDataStateSelector;
  - ./useFormErrorsFieldStateSelector;
  - ./FormButtonSubmit;
  - ./FormField;

- @contexts/ContextRepositories:

  - RepositoryAbstract.stateFacade;
  - RepositoryAbstract.createAPI;
  - RepositoryAbstract.create;
  - RepositoryUsers.create;

- @contexts/ContextState:

  - ContextStateFacade.formGenerate;
  - ContextStateFacade.stateRepositoryEntitiesListGet;
  - ContextStateFacade.formInitialValuesSet;
  - ContextStateFacade.formValueSet;
  - ContextStateFacade.formDataSubmit;

- @dialogs/DialogUserCreate;

- @forms/FormUserCreate;

- @hooks/useButtonOpen;

- @utils/validate;
- @utils/isObjectPlain;

## [ 0.0.2 - 0.0.3 ] - 2023-08-16

- Base functionality

```text

ErrorBoundary

    ContextEnvs

        ContextState

            ContextAPI

                ContextServices

                    ContextRepositories

```

- RepositoryUsers:

  - entitiesListAPI;
  - entitiesListGet;
  - entityDeleteAPI;
  - entityDelete;

- ContextStateFacade:

  - stateRepositoryEntityDelete;
  - stateRepositoryEntitiesListGet;

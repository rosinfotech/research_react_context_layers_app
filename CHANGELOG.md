[![rosinfo.tech](https://cdn.rosinfo.tech/id/logo/id_logo_width_160.svg "rosinfo.tech")](https://rosinfo.tech)

# Changelog

## [ 0.0.7 - 0.0.11 ] - 2023-08-30

- @contexts/ContextForms:

  - components:

    - FormButtonReset;
    - FormButtonSubmit;
    - FormField;

  - forms:

    - FormAbstract;
    - FormUserCreate;
    - FormUserUpdate;

  - ContextForms;
  - ContextFormsInit;
  - ContextFormsProvider;

- @contexts/ContextRepositories:

  - repositories:

    - RepositoryAbstract;
    - RepositoryUsers;

  - ContextRepositories;
  - ContextRepositoriesInit;
  - ContextRepositoriesProvider;

- @contexts/ContextServices:

  - components:

    - ServiceUIDialog;
    - ServiceUIDialogButtonOpen;

  - services:

    - ServiceAbstract;
    - ServiceUI;

  - ContextServices;
  - ContextServicesInit;
  - ContextServicesProvider;

- @contexts/ContextState:

  - hooks:

    - useStateSelectorFormData;
    - useStateSelectorFormDataField;
    - useStateSelectorFormErrorsField;
    - useStateSelectorRepositoryEntity;
    - useStateSelectorRepositoryList;
    - useStateSelectorRepositoryListIsOutdated;
    - useStateSelectorServiceProperty;

  - ContextState;
  - ContextStateFacade;

- @dialogs:

  - DialogUserCreate;
  - DialogUserUpdate;

- @forms:

  - FormUserCreate;
  - FormUserUpdate;

- @hooks:

  - useButtonOpen;

- @utils:

  - validate;
  - errorPDOExtract;
  - get;
  - isObjectPlain;
  - set;

## [ 0.0.4 - 0.0.7 ] - 2023-08-30

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

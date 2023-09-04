[![rosinfo.tech](https://cdn.rosinfo.tech/id/logo/id_logo_width_160.svg "rosinfo.tech")](https://rosinfo.tech)

# WIP (!)

# Research React Context Layer App

## Main principles

- High performance;
- Declarative;
- Reactive;

### Others

- Pass Roskoshinsky's React Architecture Test;

# Run

```shell

npm i -g @rosinfo.tech/cli

rosinfo.tech pack development

# or

npx @rosinfo.tech/cli pack development

```

# The 1st approximation

## Repositories

- Repository:

  - An interface for managing a collection of entities that have a determined data structure;

  - Contains:

    - Entities mapped 1 to 1 by Primary Keys (PK);

    - Lists mapped by encoded params string and contains arrays of PK;

    - Pages mapped by encoded params string with arrays containing pages that contains arrays of PK;

### Data processing interface

- All data in all repositories wrapped by structure with interface IDataProcessing&lt;D&gt;:

```typescript
export interface IDataProcessing<D> {
    data: D | null;
    error?: unknown;
    isError?: boolean;
    isFetched?: boolean;
    isFetching?: boolean;
    isOutdated?: boolean;
    timestamp: number;
}
```

- This structure allows to set what exactly state of the data:

  - If the data is empty – "data" assign to null and "isFetched" flag assigned to false;

  - If the data is loading – "isFetching" flag is assign to true;

  - If the data has been loaded – "isFetched" is assign to true, "isFetching" is assign to false, and "data" is assign to loaded data;

- Futhermore, every element of data wrapped by IDataProcessing&lt;D&gt;;

#### Repository interface

- Repository data save in @contexts/ContextState, so the interfaces described in [@contexts/ContextState.types](./src/contexts/ContextState/types.ts):

```typescript
export type TId = string;

export type TParamsString = string;

export type TEntitiesList = Array<TId>;

export interface IDataProcessing<D> {
    data: D | null;
    error?: unknown;
    isError?: boolean;
    isFetched?: boolean;
    isFetching?: boolean;
    isOutdated?: boolean;
    timestamp: number;
}

export interface IPage {
    [page: string]: TEntitiesList;
}

export type TDPEntitiesLists = Record<TParamsString, IDataProcessing<TEntitiesList>>;

export type TDPPages = Record<TParamsString, IDataProcessing<IPage>>;

export type TDPEntities<D> = Record<string, IDataProcessing<D>>;

export interface IStateRepository<D> {
    entities: TDPEntities<D>;
    lists: TDPEntitiesLists;
    pages: TDPPages;
}

export type TDPStateRepository<D> = IDataProcessing<IStateRepository<D>>;
```

# How to add new form

- Define type of form (for example [TFormUpdate](./src/types/users.ts));

- Define global key of form and add field in interface [IContextStateDataForms](./src/contexts/ContextState/types.ts);

- Add an according field in [contextStateInitialState](./src/contexts/ContextState/ContextState.tsx) with "null" value;

- Create class in ./src/contexts/ContextForms/forms extends from FormAbstract;

  - Creating entity form:

    - Should implemented:

      - FormAbstract.formDataToEntityAdapter;
      - FormAbstract.isValid;
      - FormAbstract.valuesInitialGet;

  - Updating entity form:

    - Should implemented:

      - FormAbstract.valuesInitialEmptyGet;

      - FormAbstract.valuesInitialGet:

        ```typescript
        public valuesInitialGet () {
            return this.valuesInitialFromEntityGet();
        }
        ```

      - FormAbstract.isValid;

- Layout form in component @forms using generic components:

  ```typescript
  import { FormButtonReset, FormButtonSubmit, FormField } from "@contexts/ContextForms";
  ```

- ... in [IContextFormsProviderState](./src/contexts/ContextForms/types.ts);

export interface IContextStateProviderState {
    state1: number;
    state2: number;
    state3: number;
}

export interface IContextStateValue extends IContextStateProviderState {
    contextStateStateSet: ( stateUpdate: Partial<IContextStateProviderState> ) => void;
}

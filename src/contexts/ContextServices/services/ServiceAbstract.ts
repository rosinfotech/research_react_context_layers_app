import { ErrorCode } from "@rosinfo.tech/utils";
import type { TAPI } from "@contexts/ContextAPI";
import type { ContextStateFacade, IContextStateDataServices } from "@contexts/ContextState";

export class ServiceAbstract<S> {

    public api: TAPI | null = null;

    public stateFacade: ContextStateFacade | null = null;

    protected stateService: keyof IContextStateDataServices | null = null;

    constructor () {
        this.valuesInitialSet = this.valuesInitialSet.bind( this );
        this.valuesInitialGet = this.valuesInitialGet.bind( this );
        this.isInitialized = this.isInitialized.bind( this );
        this.isInitializedException = this.isInitializedException.bind( this );
    }

    public valuesInitialSet ( force?: boolean ) {
        if ( !this.stateService ) {
            return false;
        }

        this.stateFacade?.serviceValuesInitialSet<S>( {
            force,
            stateService    : this.stateService,
            valuesInitialGet: this.valuesInitialGet,
        } );

        return true;
    }

    public isInitialized () {
        const isInitialized = !!this.stateFacade && !!this.stateService;

        if ( isInitialized ) {
            this.valuesInitialSet();
        }

        return isInitialized;
    }

    public isInitializedException () {
        this.stateFacade?.isInitializedException();

        if ( !this.isInitialized() ) {
            throw new ErrorCode( "0209231840" );
        }

        return true;
    }

    public valuesInitialGet (): S {
        throw new ErrorCode( "0209231841" );
    }

}

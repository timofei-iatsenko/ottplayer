// tslint:disable-next-line no-namespace
declare namespace cast.framework {
  export interface SessionStateEventData {
    errorCode?: any;
    session?: CastSession;
    sessionState: SessionState;
  }

  export interface CastStateEventData {
    castState: CastState;
  }

  export enum SessionState {
    NO_SESSION = 'NO_SESSION',
    SESSION_STARTING = 'SESSION_STARTING',
    SESSION_STARTED = 'SESSION_STARTED',
    SESSION_START_FAILED = 'SESSION_START_FAILED',
    SESSION_ENDING = 'SESSION_ENDING',
    SESSION_ENDED = 'SESSION_ENDED',
    SESSION_RESUMED = 'SESSION_RESUMED',
  }

  export enum CastState {
    NO_DEVICES_AVAILABLE = 'NO_DEVICES_AVAILABLE',
    NOT_CONNECTED = 'NOT_CONNECTED',
    CONNECTING = 'CONNECTING',
    CONNECTED = 'CONNECTED',
  }

  export enum CastContextEventType {
    CAST_STATE_CHANGED = 'CAST_STATE_CHANGED',
    SESSION_STATE_CHANGED = 'SESSION_STATE_CHANGED',
  }

  class CastContext {
    public static getInstance(): CastContext;

    public setOptions(options: CastOptions): void;
    public getCastState(): CastState;
    public getCurrentSession(): CastSession;
    public getSessionState(): SessionState;

    public requestSession(): Promise<string>;

    public removeEventListener(type: CastContextEventType, handler: Function): void;
    public addEventListener(type: CastContextEventType.CAST_STATE_CHANGED, handler: (data: CastStateEventData) => void): void;
    public addEventListener(type: CastContextEventType.SESSION_STATE_CHANGED, handler: (data: SessionStateEventData) => void): void;
  }

  interface CastOptions {
    autoJoinPolicy?: string;
    language?: string;
    receiverApplicationId?: string;
    resumeSavedSession?: boolean;
  }

  export class CastSession {
    public loadMedia(request: any): Promise<string>;
  }
}

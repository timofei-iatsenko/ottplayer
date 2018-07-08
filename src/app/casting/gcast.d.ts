// tslint:disable-next-line no-namespace
declare namespace cast.framework {
  export interface SessionStateEventData {
    errorCode?: any;
    session?: CastSession;
    sessionState: SessionState;
  }

  class RemotePlayer {
    public canControlVolume: boolean;
    public canPause: boolean;
    public canSeek: boolean;
    public currentTime: number;
    public displayName: string;
    public displayStatus: string;
    public duration: number;
    public imageUrl?: string;
    public isConnected: boolean;
    public isMediaLoaded: boolean;
    public isMuted: boolean;
    public isPaused: boolean;
    public mediaInfo: chrome.cast.media.MediaInfo;
    public playerState: any;
    public savedPlayerState: any;
    public statusText: string;
    public title?: string;
    public volumeLevel: number;
  }

  class RemotePlayerController {
    constructor(player: RemotePlayer);
    public addEventListener(type: string, listener: any): void;
    public removeEventListener(type: string, listener: any): void;
    public muteOrUnmute(): void;
    public playOrPause(): void;
    public seek(): void;
    public setVolumeLevel(): void;
    public stop(): void;
    public getFormattedTime(timeInSec: number): void;
    public getSeekPosition(currentTime: number, duration: number): number;
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

  export enum RemotePlayerEventType {
    ANY_CHANGE = 'ANY_CHANGE',
    IS_PAUSED_CHANGED = 'IS_PAUSED_CHANGED',
    CAN_PAUSE_CHANGED = 'CAN_PAUSE_CHANGED',
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

interface Window {
  __onGCastApiAvailable: (isAvailable: boolean) => void;
}

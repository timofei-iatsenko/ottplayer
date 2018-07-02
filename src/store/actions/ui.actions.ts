import { action, payload } from 'ts-action';

export const ToggleMainPanel = action('[UI] Toggle main panel', payload<{visible: boolean}>());

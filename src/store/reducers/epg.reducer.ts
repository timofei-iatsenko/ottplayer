import { on, reducer } from 'ts-action';
import { ReceiveCurrentEpg } from '../actions/epg.actions';
import { EpgDictionary } from '../../entities/epg-entry';

export const epgReducer = reducer<EpgDictionary>([
  on(ReceiveCurrentEpg, (_state, { payload }) => payload.epg),
], {});

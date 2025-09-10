import { get } from './nodecg';
import { CurrentOBSScene } from '@rpgsu-layouts/types/generated';

const nodecg = get();

export const currentOBSScene = nodecg.Replicant<CurrentOBSScene>('currentOBSScene');
export const currentDay = nodecg.Replicant<string>('currentDayAtIntermission');

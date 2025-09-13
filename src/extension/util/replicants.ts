import { get } from './nodecg';
import { CurrentOBSScene } from '@rpgsu-layouts/types/generated';

const nodecg = get();

export const currentOBSScene = nodecg.Replicant<CurrentOBSScene>('currentOBSScene');
export const currentDay = nodecg.Replicant<string>('currentDayAtIntermission');

//Layout silly utilities
export const gameTextSize = nodecg.Replicant<string>('layoutGameTextSize');
export const runnerTextSize = nodecg.Replicant<string>('runnerTextSize');
export const categoryTextSize = nodecg.Replicant<string>('categoryTextSize');
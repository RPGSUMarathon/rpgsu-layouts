import { get } from './nodecg';
import { CurrentOBSScene } from '@rpgsu-layouts/types/generated';
import { Commentator } from '@rpgsu-layouts/types/commentators';


const nodecg = get();

export const currentOBSScene = nodecg.Replicant<CurrentOBSScene>('currentOBSScene');
export const currentDay = nodecg.Replicant<string>('currentDayAtIntermission');
export const commentators = nodecg.Replicant<Commentator[]>('commentators', {defaultValue: []});


//Layout silly utilities
export const gameTextSize = nodecg.Replicant<string>('layoutGameTextSize');
export const runnerTextSize = nodecg.Replicant<string>('runnerTextSize');
export const categoryTextSize = nodecg.Replicant<string>('categoryTextSize');
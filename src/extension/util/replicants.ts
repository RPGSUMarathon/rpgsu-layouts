import { get } from './nodecg';
import { CurrentOBSScene } from '@nodecg-react-tailwind-template/types/generated';

const nodecg = get();

export const currentOBSScene = nodecg.Replicant<CurrentOBSScene>('currentOBSScene');
export const currentDay = nodecg.Replicant<string>('currentDayAtIntermission');

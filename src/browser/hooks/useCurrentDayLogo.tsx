import { useReplicant } from '@nodecg/react-hooks';

export function useCurrentDayLogo() {
  const [currentDayLogo] = useReplicant<string>('currentDayLogoAtIntermission');

  return currentDayLogo ?? '';
}

export function useCurrentDay() {
  const [currentDay] = useReplicant<number>('currentDayAtIntermission', {defaultValue: 1});

  return currentDay ?? '';
}
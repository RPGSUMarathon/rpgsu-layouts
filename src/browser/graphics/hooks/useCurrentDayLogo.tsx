import { useReplicant } from '@nodecg/react-hooks';

function useCurrentDayLogo() {
  const [currentDayLogo] = useReplicant<string>('currentDayAtIntermission');

  return currentDayLogo ?? '';
}

export default useCurrentDayLogo;
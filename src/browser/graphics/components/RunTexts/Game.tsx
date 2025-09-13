import { useMemo } from 'react';
import useCurrentRun from '../../../hooks/useCurrentRun';


export const Game = () => {
  const currentRun = useCurrentRun();
  const game = useMemo(() => currentRun?.game, [currentRun]);

  return (
    <div>
      {game}
    </div>
  );
};
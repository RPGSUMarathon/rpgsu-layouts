import { useMemo } from 'react';
import useCurrentRun from '../../../hooks/useCurrentRun';
import GameLogo from "../../img/icons/game.png";


export const Game = () => {
  const currentRun = useCurrentRun();
  const game = useMemo(() => currentRun?.game, [currentRun]);

  return (
    <div className='inline-flex align-center gap-5'>
      <img width={30} height={30} src={GameLogo} alt="Game Icon" />
      {game}
    </div>
  );
};
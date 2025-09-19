import useCurrentRun from '../../../hooks/useCurrentRun';
import { CSSProperties, useMemo } from 'react';

type PlayerProps = {
  style?: CSSProperties;
  slot?: number;
};

export const Player = ({ style, slot = 0 }: PlayerProps) => {
  const currentRun = useCurrentRun();

  const playerNames = useMemo(() => {
    if (!currentRun || currentRun.teams.length === 0) return '';

    return (
      currentRun.teams[slot]?.players
        .map((player) => player.social?.twitch || player.name)
        .join(', ') || ''
    );
  }, [currentRun, slot]);

  return (
    <div>
      {currentRun && currentRun.teams.length > 0 && <div>{playerNames}</div>}
    </div>
  );
};
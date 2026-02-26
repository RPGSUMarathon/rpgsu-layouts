import { AutoTextSize } from "auto-text-size";
import { useMemo } from "react";
import useCurrentRun from "../../../hooks/useCurrentRun";
import GameLogo from "../../img/icons/game.png";

export const Game = () => {
  const currentRun = useCurrentRun();
  const game = useMemo(() => currentRun?.game, [currentRun]);

  return (
    <div className="h-full inline-flex align-center gap-5 auto-text-size-override font-medium">
      <img width={30} height={30} src={GameLogo} alt="Game Icon" />
      <AutoTextSize as="span" mode="box" minFontSizePx={24} maxFontSizePx={28}>
        {game}
      </AutoTextSize>
    </div>
  );
};

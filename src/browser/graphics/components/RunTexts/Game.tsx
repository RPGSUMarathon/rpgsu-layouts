import { AutoTextSize } from "auto-text-size";
import { useMemo } from "react";
import useCurrentRun from "../../../hooks/useCurrentRun";

export const Game = () => {
  const currentRun = useCurrentRun();
  const game = useMemo(() => currentRun?.game, [currentRun]);

  return (
    <div className="h-full w-175  inline-flex align-center gap-5 auto-text-size-override font-medium">
      <AutoTextSize
        className="pl-3"
        as="span"
        mode="oneline"
        minFontSizePx={26}
        maxFontSizePx={34}
      >
        {game}
      </AutoTextSize>
    </div>
  );
};

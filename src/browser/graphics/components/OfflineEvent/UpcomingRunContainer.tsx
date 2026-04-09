import { type RunPropsContainer } from "@rpgsu-layouts/types/custom/intermission-elements";
import { AutoTextSize } from "auto-text-size";
import { Helpers } from "../../../helpers";
import { timeToRun } from "../../../time-to-run";
import Boss from "../../img/offline2026/icons/DesertBoss.png";
import { BossIcon } from "./BossIcon";

export const UpcomingRunContainer = ({ index, runData }: RunPropsContainer) => {
  const time = timeToRun(runData);
  const runners = Helpers.formatPlayers(runData);

  return (
    <div className="h-[125px] relative bg-(--color-world-dark) flex flex-row box2">
      <div className="w-[200px] h-full flex flex-col text-center">
        <h2 className="ridge-inner text-2xl">{time}</h2>
        <div className="place-content-center ridge-inner h-full w-full">
          {index % 2 === 0 ? (
            <BossIcon classname="glow-blue" width="80px" />
          ) : (
            <BossIcon classname="grayscale blur-[1px]" width="60px" />
          )}
        </div>
      </div>

      <div className="text-center flex flex-col font-semibold h-full w-full">
        <div className="flex-1 auto-text-size-override ridge-inner text-center">
          <AutoTextSize
            as="span"
            mode="box"
            minFontSizePx={26}
            maxFontSizePx={36}
          >
            {runData?.game}
          </AutoTextSize>
        </div>

        <div className="flex-1 flex">
          <div className="flex-1 flex auto-text-size-override ridge-inner">
            <AutoTextSize mode="box" minFontSizePx={18} maxFontSizePx={30}>
              {runData?.category}
            </AutoTextSize>
          </div>
          <div className="flex-1 flex auto-text-size-override ridge-inner">
            <AutoTextSize mode="box" minFontSizePx={18} maxFontSizePx={40}>
              {runners}
            </AutoTextSize>
          </div>
        </div>
      </div>
    </div>
  );
};

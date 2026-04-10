import { useReplicant } from "@nodecg/react-hooks";
import { type RunPropsContainer } from "@rpgsu-layouts/types/custom/intermission-elements";
import { AutoTextSize } from "auto-text-size";
import { Helpers } from "../../../helpers";
import { BossIcon } from "./BossIcon";

export const RunContainer = ({ runData }: RunPropsContainer) => {
  const runners = Helpers.formatPlayers(runData);

  const [bossDefeatedAnimation] = useReplicant<boolean>(
    "bossDefeatedAnimation",
    {
      defaultValue: false,
    },
  );

  return (
    <div
      className={`${bossDefeatedAnimation ? "boss-defeat" : ""} h-62.5 relative bg-(--color-world-main) flex flex-row box2`}
    >
      <div className="w-[200px] h-full flex flex-col text-center">
        <h2 className="ridge-inner text-3xl">Soon...</h2>
        <div className="place-content-center ridge-inner h-full w-full">
          <BossIcon
            classname={`${bossDefeatedAnimation ? "boss-defeat" : "glow-red"}`}
            width="120px"
          />
        </div>
      </div>

      <div className="text-center flex flex-col font-semibold h-full w-full ">
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

        <div className="flex-1 flex ">
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

        <div
          className="flex-1 flex"
          style={{ alignItems: "center !important" }}
        >
          <div className="flex-1 flex auto-text-size-override ridge-inner">
            <AutoTextSize mode="oneline" minFontSizePx={18} maxFontSizePx={30}>
              {runData?.system}
            </AutoTextSize>
          </div>
          <div className="flex-1 flex auto-text-size-override ridge-inner">
            <AutoTextSize mode="oneline" minFontSizePx={18} maxFontSizePx={30}>
              {runData?.estimate}
            </AutoTextSize>
          </div>
        </div>
      </div>
    </div>
  );
};

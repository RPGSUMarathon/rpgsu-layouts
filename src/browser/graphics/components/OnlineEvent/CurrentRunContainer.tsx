import { Helpers } from "@rpgsu-layouts/browser/helpers";
import { AutoTextSize } from "auto-text-size";

export const CurrentRunContainer = ({ runData }: RunPropsContainer) => {
  const runners = Helpers.formatPlayers(runData);

  return (
    <div className="mx-10 my-10 h-62.5 shadow-2xl border-7 border-[#375481] rounded-b-sm relative bg-[#141c2f]">
      <span className="pl-5 pr-8 py-2 text-3xl bg-[#5775a4] absolute -top-6.25 -left-7.5 rounded-sm w-140 font-normal italic">
        Setting up for...
      </span>
      <div className="text-center flex flex-col font-semibold absolute top-6.5 h-52.5 w-full">
        <div className="flex-1 auto-text-size-override border-b border-white text-center">
          <AutoTextSize
            as="span"
            mode="box"
            minFontSizePx={26}
            maxFontSizePx={36}
          >
            {runData?.game}
          </AutoTextSize>
        </div>

        <div className="flex-1 flex border-b border-white">
          <div className="flex-1 flex auto-text-size-override border-r border-white">
            <AutoTextSize mode="box" minFontSizePx={18} maxFontSizePx={30}>
              {runData?.category}
            </AutoTextSize>
          </div>
          <div className="flex-1 flex auto-text-size-override">
            <AutoTextSize mode="box" minFontSizePx={18} maxFontSizePx={40}>
              {runners}
            </AutoTextSize>
          </div>
        </div>

        <div
          className="flex-1 flex"
          style={{ alignItems: "center !important" }}
        >
          <div className="flex-1 flex auto-text-size-override border-r border-white">
            <AutoTextSize mode="oneline" minFontSizePx={18} maxFontSizePx={30}>
              {runData?.system}
            </AutoTextSize>
          </div>
          <div className="flex-1 flex auto-text-size-override">
            <AutoTextSize mode="oneline" minFontSizePx={18} maxFontSizePx={30}>
              {runData?.estimate}
            </AutoTextSize>
          </div>
        </div>
      </div>
    </div>
  );
};
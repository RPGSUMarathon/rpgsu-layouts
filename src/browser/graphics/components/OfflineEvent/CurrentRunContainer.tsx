import { AutoTextSize } from "auto-text-size";
import { Helpers } from "../../../helpers";
import logoText from "../../img/logo-text.png";

export const RunContainer = ({ runData }: RunPropsContainer) => {
  const runners = Helpers.formatPlayers(runData);

  return (
    <div className="h-62.5 relative bg-[#6e7c9c] flex flex-row box2">
      <div className="w-[200px] h-full flex flex-col text-center">
        <h2 className="ridge-inner text-3xl">Soon...</h2>
        <div className="place-content-center ridge-inner h-full w-full">
          <img src={logoText} width="120px" className="glow-red mx-auto" />
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

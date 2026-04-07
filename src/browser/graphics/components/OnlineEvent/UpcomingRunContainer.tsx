import { AutoTextSize } from "auto-text-size";
import { Helpers } from "../../../helpers";
import { timeToRun } from "../../../time-to-run";

export const UpcomingRunContainer = ({ index, runData }: RunPropsContainer) => {
  const time = timeToRun(runData);
  const runners = Helpers.formatPlayers(runData);

  return (
    <div className="mx-10 h-31.5 w-[] mt-10 mb-15 shadow-xl rounded-b-sm  relative">
      <span
        className={`pl-5 pr-8 py-1 text-2xl font-bold ${index % 2 === 0 ? "bg-[#6e848c]" : "bg-[#5775a4]"} absolute -top-6.25 -left-7.5 rounded-l-sm container-border`}
      >
        {time}
      </span>
      <div className="text-center flex flex-col justify-around">
        <div
          className={`h-18.75 mt-1.25 ${index % 2 === 0 ? "bg-[#4f6c5f]/60" : "bg-[#365280]/60"} pl-1 pb-1  flex items-end justify-start`}
        >
          <span className="text-4xl font-medium">
            <AutoTextSize mode="box" minFontSizePx={28} maxFontSizePx={36}>
              {runData?.game}
            </AutoTextSize>
          </span>
        </div>

        <div
          className={`h-11.5 font-semibold flex justify-between px-5 ${index % 2 === 0 ? "bg-[#4f6c5f]" : "bg-[#365280]"}  items-center`}
        >
          <AutoTextSize mode="oneline" minFontSizePx={18} maxFontSizePx={28}>
            {runners}
          </AutoTextSize>
          <AutoTextSize mode="oneline" minFontSizePx={18} maxFontSizePx={30}>
            {runData?.estimate}
          </AutoTextSize>
        </div>
      </div>
    </div>
  );
};
import type { TiltifyPoll } from "@rpgsu-layouts/types";
import { AutoTextSize } from "auto-text-size";
import { Helpers } from "../../../helpers";

export const IncentiveContainer = ({ poll }: { poll: TiltifyPoll }) => {
  return (
    <div className="flex w-full flex-col">
      <div className="auto-text-size-override ridge-inner flex min-h-10 items-center justify-center bg-(--color-world-dark)">
        <AutoTextSize
          mode="oneline"
          minFontSizePx={12}
          maxFontSizePx={28}
          className="px-2 font-semibold"
        >
          {poll.name}
        </AutoTextSize>
      </div>
      {poll.options.map((option) => (
        <div key={option.id} className="flex min-h-9 w-full">
          <div className="auto-text-size-override ridge-inner flex flex-1 items-center bg-(--color-world-bg)">
            <AutoTextSize
              mode="oneline"
              minFontSizePx={10}
              maxFontSizePx={24}
              className="px-2"
            >
              {option.name}
            </AutoTextSize>
          </div>
          <div className="auto-text-size-override ridge-inner flex w-32 items-center justify-center bg-(--color-world-main)">
            <AutoTextSize
              mode="oneline"
              minFontSizePx={10}
              maxFontSizePx={22}
              className="px-1"
            >
              {Helpers.formatAmount(option.amount, option.currency)}
            </AutoTextSize>
          </div>
        </div>
      ))}
    </div>
  );
};

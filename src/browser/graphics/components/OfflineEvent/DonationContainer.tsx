import { type DonationProps } from "@rpgsu-layouts/types/custom/intermission-elements";
import { AutoTextSize } from "auto-text-size";

export const DonationContainer = ({ name, amount, message }: DonationProps) => {
  return (
    <div className="w-full flex flex-col">
      <div className="flex w-full">
        <div className="flex-1 flex auto-text-size-override ridge-inner bg-(--color-world-dark)">
          <AutoTextSize
            mode="oneline"
            minFontSizePx={10}
            maxFontSizePx={28}
            className="px-2"
          >
            {name}
          </AutoTextSize>
        </div>
        <div className="flex-1 flex auto-text-size-override ridge-inner bg-(--color-world-main)">
          <AutoTextSize
            mode="oneline"
            minFontSizePx={12}
            maxFontSizePx={28}
            className="px-1"
          >
            {amount}
          </AutoTextSize>
        </div>
      </div>
      {message != null ? (
        <div className="w-full ridge-inner bg-(--color-world-bg)">
          <AutoTextSize
            className="font-light px-1 "
            mode="box"
            minFontSizePx={18}
            maxFontSizePx={34}
          >
            {message}
          </AutoTextSize>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

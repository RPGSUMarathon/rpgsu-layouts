import { type DonationProps } from "@rpgsu-layouts/types/custom/intermission-elements";
import { AutoTextSize } from "auto-text-size";
import { Helpers } from "../../../helpers";

export const DonationContainer = ({
  name,
  amount,
  currency,
  message,
}: DonationProps) => {
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
            {Helpers.formatAmount(amount, currency)}
          </AutoTextSize>
        </div>
      </div>
      {message != null ? (
        <div className="w-full ridge-inner bg-(--color-world-bg) p-1">
          <div className="flex h-full w-full items-center justify-center">
            <AutoTextSize
              className="text-center font-light"
              mode="box"
              minFontSizePx={22}
              maxFontSizePx={34}
            >
              {message}
            </AutoTextSize>
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

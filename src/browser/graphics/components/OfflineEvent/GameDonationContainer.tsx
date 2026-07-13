import { type DonationProps } from "@rpgsu-layouts/types/custom/intermission-elements";
import { AutoTextSize } from "auto-text-size";

export const GameDonationContainer = ({
  name,
  amount,
  message,
}: DonationProps) => {
  return (
    <div className="flex flex-col border border-1 border-black  h-[120px] w-[715px] m-auto z-10">
      <div className="h-[50px] auto-text-size-override bg-(--color-world-dark)">
        <AutoTextSize
          mode="oneline"
          minFontSizePx={10}
          maxFontSizePx={28}
          className="px-2"
        >
          {name} donated {amount}
        </AutoTextSize>
      </div>
      {message != null ? (
        <div className="h-[70px] mx-auto bg-(--color-world-bg) text-clip">
          <AutoTextSize
            className="font-light px-1"
            mode="box"
            minFontSizePx={18}
            maxFontSizePx={34}
          >
            {message}
          </AutoTextSize>
        </div>
      ) : (
        <div className="text-italic w-full text-2xl h-[70px] bg-(--color-world-dark)">
          Thank you for your donation!
        </div>
      )}
    </div>
  );
};

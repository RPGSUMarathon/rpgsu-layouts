import { type DonationProps } from "@rpgsu-layouts/types/custom/intermission-elements";
import { AutoTextSize } from "auto-text-size";

export type GameDonationContainerProps = {
  data: DonationProps;
};

export const GameDonationContainer = ({ data }: GameDonationContainerProps) => {
  return (
    <div className="flex flex-col m-auto w-full">
      <div className="h-[35px] auto-text-size-override bg-(--color-world-dark)">
        <AutoTextSize
          mode="oneline"
          minFontSizePx={10}
          maxFontSizePx={28}
          className="px-2"
        >
          {data.name} donated {data.amount}
        </AutoTextSize>
      </div>
      {data.message != null ? (
        <div className="h-[85px] mx-auto bg-(--color-world-bg) text-clip">
          <AutoTextSize
            className="font-light px-1"
            mode="box"
            minFontSizePx={18}
            maxFontSizePx={34}
          >
            {data.message}
          </AutoTextSize>
        </div>
      ) : (
        <div className="text-italic w-full text-2xl h-[85px] flex items-center justify-center bg-(--color-world-dark)">
          RPGSU thanks you for your donation!
        </div>
      )}
    </div>
  );
};

import { useListenFor } from "@nodecg/react-hooks";
import { type DonationQueueItem } from "@rpgsu-layouts/types/custom/tiltify";
import { AutoTextSize } from "auto-text-size";
import { useState } from "react";
import { Helpers } from "../helpers";
import { render } from "../render";
import { DashboardThemeProvider } from "./components/DashboardThemeProvider";

const LatestDonation = () => {
  const [latestDonation, setLatestDonation] = useState<DonationQueueItem>({
    id: "",
    name: "",
    amount: 0,
    comment: "",
    timestamp: "",
    currency: "",
  });

  useListenFor<DonationQueueItem>("notifyDonation", setLatestDonation);

  return (
    <DashboardThemeProvider>
      <div className="flex h-full w-full flex-col">
        <div className="h-[35px] auto-text-size-override bg-(--color-world-dark)">
          <AutoTextSize
            mode="oneline"
            minFontSizePx={10}
            maxFontSizePx={28}
            className="px-2"
          >
            {latestDonation.name} -{" "}
            {Helpers.formatAmount(
              latestDonation.amount,
              latestDonation.currency,
            )}
          </AutoTextSize>
        </div>
        {latestDonation.comment != null ? (
          <div className="h-[85px] w-full bg-(--color-world-bg) text-clip">
            <AutoTextSize
              className="font-light px-1"
              mode="box"
              minFontSizePx={18}
              maxFontSizePx={34}
            >
              {latestDonation.comment}
            </AutoTextSize>
          </div>
        ) : (
          <div className="text-italic w-full text-2xl h-[85px] flex items-center justify-center bg-(--color-world-dark)">
            No message.
          </div>
        )}
      </div>
    </DashboardThemeProvider>
  );
};

render(<LatestDonation />);

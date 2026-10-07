import { useListenFor } from "@nodecg/react-hooks";
import { type DonationQueueItem } from "@rpgsu-layouts/types/custom/tiltify";
import { useState } from "react";
import { Helpers } from "../helpers";
import { render } from "../render";
import { DashboardThemeProvider } from "./components/DashboardThemeProvider";

const LatestDonation = () => {
  const [latestDonation, setLatestDonation] = useState<
    DonationQueueItem | undefined
  >();

  useListenFor<DonationQueueItem>("notifyDonation", setLatestDonation);

  return (
    <DashboardThemeProvider>
      {latestDonation ? (
        <div className="flex flex-col items-center">
          <h2 className="text-3xl">Latest Donation:</h2>
          <span className="text-6xl ">
            {latestDonation.name} -{" "}
            {Helpers.formatAmount(
              latestDonation.amount,
              latestDonation.currency,
            )}
          </span>
          {latestDonation.comment != null ? (
            <span className="text-5xl mt-5">{latestDonation.comment}</span>
          ) : (
            <div className="text-2xl flex items-center justify-center">
              No message.
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center text-4xl">
          No donation approved yet.
        </div>
      )}
    </DashboardThemeProvider>
  );
};

render(<LatestDonation />);

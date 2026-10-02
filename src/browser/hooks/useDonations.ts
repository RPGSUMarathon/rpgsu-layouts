import { useReplicant } from "@nodecg/react-hooks";
import { DonationQueueItem } from "@rpgsu-layouts/types";
import { useMemo } from "react";

function useProcessedDonations() {
  const [processedDonations] = useReplicant<DonationQueueItem[]>(
    "processedDonations",
    { bundle: "rpgsu-layouts" },
  );

  return useMemo(
    () =>
      [...(processedDonations ?? [])].sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      ),
    [processedDonations],
  );
}

export default useProcessedDonations;

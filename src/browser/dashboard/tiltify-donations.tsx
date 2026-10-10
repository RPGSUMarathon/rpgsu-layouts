import { Alert, Box, Stack, Typography } from "@mui/material";
import { useReplicant } from "@nodecg/react-hooks";
import type { DonationQueueItem } from "../../types/custom/tiltify";
import { Helpers } from "../helpers";
import useDonationTotal from "../hooks/useDonationTotal";
import { render } from "../render";
import { DashboardThemeProvider } from "./components/DashboardThemeProvider";
import { TiltifyDonation } from "./components/TiltifyDonation";

const TiltifyDonations = () => {
  const [donationQueue] = useReplicant<DonationQueueItem[]>("donationQueue", {
    defaultValue: [],
  });
  const donationTotal = useDonationTotal();

  return (
    <DashboardThemeProvider>
      <Stack spacing={1.5}>
        <Box>
          <Typography variant="caption" color="text.secondary">
            Donation total
          </Typography>
          <Typography variant="h5" color="success.main" fontWeight={700}>
            {Helpers.formatAmount(donationTotal.amount, donationTotal.currency)}
          </Typography>
        </Box>

        {(donationQueue ?? []).length === 0 ? (
          <Alert severity="info">There are no donations to process.</Alert>
        ) : (
          (donationQueue ?? []).map((donation) => (
            <TiltifyDonation key={donation.id} donation={donation} />
          ))
        )}
      </Stack>
    </DashboardThemeProvider>
  );
};

render(<TiltifyDonations />);

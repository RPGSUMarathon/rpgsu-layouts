import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { useReplicant } from "@nodecg/react-hooks";
import { FaChevronDown } from "react-icons/fa";
import type { DonationQueueItem } from "../../types/custom/tiltify";
import { render } from "../render";
import { DashboardThemeProvider } from "./components/DashboardThemeProvider";

const formatAmount = (amount: number, currency: string) => {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
    }).format(amount);
  } catch {
    return `${amount.toFixed(2)} ${currency}`;
  }
};

const formatTimestamp = (timestamp: Date | string) => {
  const date = new Date(timestamp);
  return Number.isNaN(date.getTime()) ? "Unknown" : date.toLocaleString();
};

const TiltifyDonations = () => {
  const [donationQueue] = useReplicant<DonationQueueItem[]>("donationQueue", {
    defaultValue: [],
  });

  const processDonation = (donation: DonationQueueItem) => {
    void nodecg.sendMessage("processTiltifyDonation", donation.id);
  };

  return (
    <DashboardThemeProvider>
      <Stack spacing={1.5}>
        {(donationQueue ?? []).length === 0 ? (
          <Alert severity="info">There are no donations to process.</Alert>
        ) : (
          (donationQueue ?? []).map((donation) => (
            <Accordion key={donation.id} disableGutters>
              <AccordionSummary expandIcon={<FaChevronDown />}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 2,
                    width: "100%",
                    pr: 1,
                  }}
                >
                  <Typography fontWeight={500}>{donation.name}</Typography>
                  <Typography color="success.main" fontWeight={700}>
                    {formatAmount(donation.amount, donation.currency)}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Comment
                    </Typography>
                    <Typography sx={{ whiteSpace: "pre-wrap" }}>
                      {donation.comment || "No comment provided"}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Donated at
                    </Typography>
                    <Typography>
                      {formatTimestamp(donation.timestamp)}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Donation ID
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ overflowWrap: "anywhere" }}
                    >
                      {donation.id}
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    onClick={() => processDonation(donation)}
                  >
                    Mark as verified
                  </Button>
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </Stack>
    </DashboardThemeProvider>
  );
};

render(<TiltifyDonations />);

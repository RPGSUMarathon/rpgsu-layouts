import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import type { DonationQueueItem } from "../../../types/custom/tiltify";
import { Helpers } from "../../helpers";

const formatTimestamp = (timestamp: Date | string) => {
  const date = new Date(timestamp);
  return Number.isNaN(date.getTime()) ? "Unknown" : date.toLocaleString();
};

export const TiltifyDonation = ({
  donation,
}: {
  donation: DonationQueueItem;
}) => {
  const [comment, setComment] = useState(donation.comment ?? "");

  const processDonation = (includeComment: boolean) => {
    void nodecg.sendMessage("processTiltifyDonation", {
      donationId: donation.id,
      includeComment,
      comment,
    });
  };

  return (
    <Accordion disableGutters>
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
            {Helpers.formatAmount(donation.amount, donation.currency)}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={2}>
          <TextField
            label="Comment"
            value={comment}
            placeholder="No comment provided"
            multiline
            minRows={2}
            fullWidth
            onChange={(event) => {
              setComment(event.target.value);
            }}
          />

          <Box>
            <Typography variant="caption" color="text.secondary">
              Donated at
            </Typography>
            <Typography>{formatTimestamp(donation.timestamp)}</Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary">
              Donation ID
            </Typography>
            <Typography variant="body2" sx={{ overflowWrap: "anywhere" }}>
              {donation.id}
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={() => processDonation(true)}
          >
            Verify with comment
          </Button>
          <Button
            variant="outlined"
            color="success"
            fullWidth
            onClick={() => processDonation(false)}
          >
            Verify without comment
          </Button>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

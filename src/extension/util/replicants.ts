import {
  type DonationGoal,
  type DonationQueueItem,
  type TiltifyPoll,
  type TiltifyTokenData,
} from "@rpgsu-layouts/types";
import { type Commentator } from "@rpgsu-layouts/types/custom/commentators";
import { type CurrentOBSScene } from "@rpgsu-layouts/types/generated";
import { get } from "./nodecg";

const nodecg = get();

export const currentOBSScene =
  nodecg.Replicant<CurrentOBSScene>("currentOBSScene");

export const commentators = nodecg.Replicant<Commentator[]>("commentators", {
  defaultValue: [],
});

export const bossDefeatedAnimation = nodecg.Replicant<boolean>(
  "bossDefeatedAnimation",
);

export const timestamps = nodecg.Replicant<Timestamp[]>("timestamps");
export const tiltifyTokens = nodecg.Replicant<TiltifyTokenData>(
  "tiltifyTokens",
  {
    persistent: true,
    defaultValue: {
      access_token: "",
      expires_at: new Date(0),
    },
  },
);

export const processedDonations = nodecg.Replicant<DonationQueueItem[]>(
  "processedDonations",
  {
    defaultValue: [],
    persistent: true,
  },
);

export const polls = nodecg.Replicant<TiltifyPoll[]>("polls", {
  defaultValue: [],
  persistent: true,
});

export const donationTotal = nodecg.Replicant<number>("donationTotal", {
  defaultValue: 0,
  persistent: false,
});

export const donationGoals = nodecg.Replicant<DonationGoal[]>("donationGoals", {
  defaultValue: [],
  persistent: false,
});

export const donationQueue = nodecg.Replicant<DonationQueueItem[]>(
  "donationQueue",
  { defaultValue: [] },
);

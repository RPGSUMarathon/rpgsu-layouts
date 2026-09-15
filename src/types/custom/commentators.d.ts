import { type Channel } from "./channel";

export type Commentator = {
  id: number;
  name: string;
  pronouns: string;
  twitch: string;
  bluesky: string;
  channel: Channel;
};

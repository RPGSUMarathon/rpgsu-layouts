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

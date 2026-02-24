import { type CurrentOBSScene } from "@rpgsu-layouts/types/generated";
import { type Commentator } from "../../types/generated/commentators";
import { get } from "./nodecg";

const nodecg = get();

export const currentOBSScene =
  nodecg.Replicant<CurrentOBSScene>("currentOBSScene");
export const currentDay = nodecg.Replicant<string>(
  "currentDayLogoAtIntermission",
);
export const commentators = nodecg.Replicant<Commentator[]>("commentators", {
  defaultValue: [],
});

//Layout silly utilities
export const gameTextSize = nodecg.Replicant<string>("layoutGameTextSize");
export const runnerTextSize = nodecg.Replicant<string>("runnerTextSize");
export const categoryTextSize = nodecg.Replicant<string>("categoryTextSize");

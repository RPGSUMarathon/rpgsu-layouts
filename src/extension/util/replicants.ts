import { type CurrentOBSScene } from "@rpgsu-layouts/types/generated";
import { type Commentator } from "../../types/generated/commentators";
import { get } from "./nodecg";

const nodecg = get();

export const currentOBSScene =
  nodecg.Replicant<CurrentOBSScene>("currentOBSScene");

export const commentators = nodecg.Replicant<Commentator[]>("commentators", {
  defaultValue: [],
});
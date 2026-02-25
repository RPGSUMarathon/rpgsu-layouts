import type NodeCG from "nodecg/types";
import { type Configschema } from "src/types/generated";
import { set } from "./util/nodecg";

export default (nodecg: NodeCG.ServerAPI<Configschema>) => {
  set(nodecg);
  require("./obs");
  require("./layouts");
};

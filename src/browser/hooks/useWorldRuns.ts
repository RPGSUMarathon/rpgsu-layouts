import { useReplicant } from "@nodecg/react-hooks";
import { RunDataArray } from "speedcontrol/src/types/schemas/runDataArray";

function useWorldRuns(currentRunId: string) {
  const [runDataArrayRep] = useReplicant<RunDataArray>("runDataArray", {
    defaultValue: [],
    bundle: "nodecg-speedcontrol",
  });
  const [world] = useReplicant<string>("currentWorld", {
    defaultValue: "1",
  });

  const currentRunIndex = (runDataArrayRep ?? []).findIndex(
    (run) => run.id === currentRunId,
  );
  let upcomingRuns = null;
  if (currentRunIndex > -1) {
    upcomingRuns = (runDataArrayRep ?? [])
      .slice(currentRunIndex)
      .filter((run) => run.customData.world === world);
  }

  return upcomingRuns;
}

export default useWorldRuns;

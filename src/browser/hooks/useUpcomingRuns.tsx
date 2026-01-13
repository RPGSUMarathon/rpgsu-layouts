import { useReplicant } from "@nodecg/react-hooks";
import { RunDataArray } from '../../../bundles/nodecg-speedcontrol/src/types'

function useUpcomingRuns(count: number, currentRunId:string) {
    const [runDataArrayRep] = useReplicant<RunDataArray>("runDataArray", {
        defaultValue: [],
        bundle: "nodecg-speedcontrol",
    });

    const currentRunIndex = (runDataArrayRep ?? []).findIndex((run) => run.id === currentRunId);
    var upcomingRuns = null;
    if (currentRunIndex > -1) {
       upcomingRuns = (runDataArrayRep ?? []).slice(currentRunIndex + 1, currentRunIndex + count + 1);
    }

    return upcomingRuns;
}

export default useUpcomingRuns;
import { useReplicant } from "@nodecg/react-hooks";
import { RunDataArray } from 'speedcontrol/src/types'
import { RunDataActiveRunSurrounding } from 'speedcontrol/src/types/schemas'

function useNextRun() {
	const [runDataActiveRunSurroundingRep] = useReplicant<RunDataActiveRunSurrounding>(
		"runDataActiveRunSurrounding",
		{
			bundle: "nodecg-speedcontrol",
		},
	);
	const [runDataArrayRep] = useReplicant<RunDataArray>("runDataArray", {
		bundle: "nodecg-speedcontrol",
	});

	return (runDataArrayRep ?? []).find((run) => run.id === runDataActiveRunSurroundingRep?.next);
}

export default useNextRun;
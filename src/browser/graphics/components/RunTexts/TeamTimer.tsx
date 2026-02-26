import { useReplicant } from "@nodecg/react-hooks";
import { type Timer as TimerType } from "../../../../../bundles/nodecg-speedcontrol/src/types/schemas/timer";
import useCurrentRun from "../../../hooks/useCurrentRun";

type TimerProps = {
  classname?: string;
  slot?: number;
};

export const TeamTimer = ({ classname, slot = 0 }: TimerProps) => {
  const [timer] = useReplicant<TimerType>("timer", {
    bundle: "nodecg-speedcontrol",
  });
  const currentRun = useCurrentRun();
  const id = currentRun?.teams[slot]?.id ?? "";

  return (
    <div
      className={`${classname} text-3xl font-bold text-shadow-md text-shadow-black shine-animation`}
    >
      {timer && <div>{timer.teamFinishTimes[id]?.time}</div>}
    </div>
  );
};

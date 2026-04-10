import { useReplicant } from "@nodecg/react-hooks";
import useWorldRuns from "../../../../browser/hooks/useWorldRuns";
import BaseBoss from "../../img/offline2026/icons/BaseBoss.png";
import DesertBoss from "../../img/offline2026/icons/DesertBoss.png";
import ForestBoss from "../../img/offline2026/icons/ForestBoss.png";
import SnowBoss from "../../img/offline2026/icons/SnowBoss.png";
import VolcanoBoss from "../../img/offline2026/icons/VolcanoBoss.png";

type BossCounterContainerProps = {
  currentRunId: string;
};

export const BossCounterContainer = ({
  currentRunId,
}: BossCounterContainerProps) => {
  const runsThisWorld = useWorldRuns(currentRunId);
  const [world] = useReplicant<string>("currentWorld", {
    defaultValue: "1",
  });

  let currentImage = "";
  switch (world) {
    case "1":
      currentImage = ForestBoss;
      break;
    case "2":
      currentImage = SnowBoss;
      break;
    case "3":
      currentImage = VolcanoBoss;
      break;
    case "4":
      currentImage = DesertBoss;
      break;
    default:
      currentImage = BaseBoss;
      break;
  }

  if (!currentImage) {
    return null;
  }
  return (
    <div className="justify-center mt-2 grid grid-flow-col-dense  ">
      {runsThisWorld &&
        runsThisWorld.map((run) => (
          <img key={run.id} src={currentImage} width="70px" className="" />
        ))}
    </div>
  );
};

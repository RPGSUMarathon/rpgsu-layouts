import { useReplicant } from "@nodecg/react-hooks";
import BaseBoss from "../../img/offline2026/icons/BaseBoss.png";
import DesertBoss from "../../img/offline2026/icons/DesertBoss.png";
import ForestBoss from "../../img/offline2026/icons/ForestBoss.png";
import SnowBoss from "../../img/offline2026/icons/SnowBoss.png";
import VolcanoBoss from "../../img/offline2026/icons/VolcanoBoss.png";

type BossIconProps = {
  classname: string;
  width: string;
};

export const BossIcon = ({ classname, width }: BossIconProps) => {
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
    <img src={currentImage} width={width} className={`${classname} mx-auto`} />
  );
};

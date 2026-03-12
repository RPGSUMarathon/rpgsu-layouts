import { AutoTextSize } from "auto-text-size";
import { type CSSProperties } from "react";
import useCurrentRun from "../../../hooks/useCurrentRun";
import EstimateLogo from "../../img/icons/timer.png";

type EstimateProps = {
  style?: CSSProperties;
};

export const Estimate = ({ style }: EstimateProps) => {
  const currentRun = useCurrentRun();

  return (
    <div
      className="h-full inline-flex align-center gap-3 auto-text-size-override font-medium"
      style={style}
    >
      <img width={35} height={30} src={EstimateLogo} alt="Estimate Icon" />
      <AutoTextSize as="span" mode="box" minFontSizePx={25} maxFontSizePx={40}>
        {currentRun && currentRun.estimate ? currentRun.estimate : ""}
      </AutoTextSize>
    </div>
  );
};

import { AutoTextSize } from "auto-text-size";
import useCurrentRun from "../../../hooks/useCurrentRun";

export const Category = () => {
  const currentRun = useCurrentRun();

  return (
    <div className="h-full inline-flex align-center gap-3 p-1 auto-text-size-override">
      <AutoTextSize as="span" mode="box" minFontSizePx={23} maxFontSizePx={40}>
        {currentRun && currentRun.category ? currentRun.category : ""}
      </AutoTextSize>
    </div>
  );
};

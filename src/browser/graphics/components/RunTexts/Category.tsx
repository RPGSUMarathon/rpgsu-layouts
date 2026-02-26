import { AutoTextSize } from "auto-text-size";
import useCurrentRun from "../../../hooks/useCurrentRun";
import CategoryLogo from "../../img/icons/category.png";

export const Category = () => {
  const currentRun = useCurrentRun();

  return (
    <div className="h-full inline-flex align-center gap-3 auto-text-size-override">
      <img width={30} height={30} src={CategoryLogo} alt="Category Icon" />
      <AutoTextSize as="span" mode="box" minFontSizePx={25} maxFontSizePx={30}>
        {currentRun && currentRun.category ? currentRun.category : ""}
      </AutoTextSize>
    </div>
  );
};

import { useReplicant } from "@nodecg/react-hooks";
import { render } from "../../render";
import { ThemeProvider } from "../components/theme-provider";
import * as Layouts from "./game-layouts/index";

const layoutMap: Record<string, React.FC> = {
  "4_3-1p": Layouts.L4x3_1P,
  "16_9-1p": Layouts.L16x9_1P,
  "gb-1p": Layouts.Lgb_1P,
  "gba-1p": Layouts.Lgba_1P,
  "3ds-1p": Layouts.L3ds_1P,
  "ds-1p": Layouts.Lds_1P,
  "16_9-2p": Layouts.L16x9_2P,
};

export function DynamicLayout({ layoutKey }: { layoutKey: string }) {
  const LayoutComponent = layoutMap[layoutKey] ?? Layouts.L4x3_1P;
  return <LayoutComponent />;
}

const FlashingLightsWarning = () => {
  return (
    <div className="z-10 absolute flex top-[415px] left-0 w-[450px] h-12.5 bg-red-900 border border-white border-3 justify-center items-center">
      <span className="font-bold text-2xl">WARNING: FLASHING LIGHTS</span>
    </div>
  );
};

const App = () => {
  const [gameLayout] = useReplicant<string>("currentGameLayout");
  const [flashWarningOn] = useReplicant<boolean>("flashWarningOn", {
    defaultValue: false,
  });

  return (
    <ThemeProvider>
      <DynamicLayout layoutKey={gameLayout ?? "16_9-1p"} />
      {flashWarningOn && <FlashingLightsWarning />}
    </ThemeProvider>
  );
};

render(<App />);

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
  "16_9-2p-2c": Layouts.L16x9_2P_2C,
};

const flashWarningPosition: Record<string, string> = {
  "4_3-1p": "top-[415px] left-0 w-112.5",
  "16_9-2p-2c": "left-[498px] w-[924px] top-[730px]",
};

export function DynamicLayout({ layoutKey }: { layoutKey: string }) {
  const LayoutComponent = layoutMap[layoutKey] ?? Layouts.L4x3_1P;
  return <LayoutComponent />;
}

const FlashingLightsWarning = ({ layoutKey }: { layoutKey: string }) => {
  const position =
    flashWarningPosition[layoutKey] ?? flashWarningPosition["4_3-1p"];

  return (
    <div
      className={`z-10 absolute flex ${position}  h-12.5 bg-red-900 border-white border-3 justify-center items-center`}
    >
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
      {flashWarningOn && (
        <FlashingLightsWarning layoutKey={gameLayout ?? "4_3-1p"} />
      )}
    </ThemeProvider>
  );
};

render(<App />);

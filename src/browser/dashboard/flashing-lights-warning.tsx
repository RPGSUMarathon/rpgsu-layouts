import { useReplicant } from "@nodecg/react-hooks/use-replicant";
import { render } from "../render";
import { DashboardThemeProvider } from "./components/DashboardThemeProvider";

const FlashingLightsWarning = () => {
  const [flashWarningOn, setFlashWarningOn] = useReplicant<boolean>(
    "flashWarningOn",
    {
      defaultValue: false,
    },
  );

  return (
    <DashboardThemeProvider>
      <div className="inline-flex items-center justify-between">
        <span className="text-lg font-semibold">
          Turn on flashing lights warning:{" "}
        </span>
        <button
          onClick={() => setFlashWarningOn(!flashWarningOn)}
          className={`flex items-center justify-center w-12 h-6 rounded-full transition-colors ${
            flashWarningOn ? "bg-red-600" : "bg-gray-300"
          }`}
        >
          <span className="text-md">{flashWarningOn ? "On" : "Off"}</span>
        </button>
      </div>
    </DashboardThemeProvider>
  );
};

render(<FlashingLightsWarning />);

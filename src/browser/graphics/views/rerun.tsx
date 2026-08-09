import type { RunData } from "speedcontrol/src/types";
import type { RunDataActiveRunSurrounding } from "speedcontrol/src/types/schemas";
import { render } from "../../render";
import { timeToRun as timeToRunFunc } from "../../time-to-run";
import { ThemeProvider } from "../components/theme-provider";
import Logo from "../img/offline2026/offline26_logo.png";

const runDataArray = nodecg.Replicant<RunData[]>(
  "runDataArray",
  "nodecg-speedcontrol",
);
const runDataActiveRunSurrounding =
  nodecg.Replicant<RunDataActiveRunSurrounding>(
    "runDataActiveRunSurrounding",
    "nodecg-speedcontrol",
  );

function getNextRun() {
  return (runDataArray.value ?? []).find(
    (run) => run.id === runDataActiveRunSurrounding.value?.next,
  );
}

export const Rerun = () => {
  const nextRun = getNextRun();
  const timeToRun = timeToRunFunc(nextRun);

  return (
    <ThemeProvider theme="offline" className="w-full h-full">
      <div className="bottom-[160px] left-[40px] absolute bg-(--color-world-bg) box2-inverted p-5 text-center rotate-15 ">
        <h1 className="text-2xl engraved">This is a rerun. </h1>
        <h1 className="text-2xl engraved">
          Live runs will be back in {timeToRun}
        </h1>
      </div>
    </ThemeProvider>
  );
};

render(<Rerun />);

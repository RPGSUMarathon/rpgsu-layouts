import type { RunData } from "speedcontrol/src/types";
import type { RunDataActiveRunSurrounding } from "speedcontrol/src/types/schemas";
import { useLayoutEffect, useState } from "react";
import { Helpers } from "../../../../helpers";
import { timeToRun as timeToRunFunc } from "../../../../time-to-run";
import { ScrollingMessage } from "./ScrollingMessage";

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

interface Props {
  timeout: number;
  onEnd: () => void;
  onScrollingNeeded?: (needsScrolling: boolean) => void;
  containerRef: React.RefObject<HTMLDivElement>;
}

export function NextRun({
  timeout,
  onEnd,
  containerRef,
  onScrollingNeeded,
}: Props) {
  const [msg, setMsg] = useState("");

  useLayoutEffect(() => {
    NodeCG.waitForReplicants(runDataArray, runDataActiveRunSurrounding)
      .then(() => {
        const nextRun = getNextRun();
        if (nextRun) {
          const timeToRun = timeToRunFunc(nextRun);
          if (timeToRun.length > 0) {
            setMsg(
              `Next run <span class="text-[#bbeee8ff] font-bold">${timeToRun}</span> - ${nextRun.customData.gameShort ?? nextRun.game ?? ""} ${nextRun.category ?? ""} by <span class="text-[#bbeee8ff] font-bold">${Helpers.formatPlayers(nextRun)}</span>`,
            );
          } else {
            setMsg(
              `Next run - ${nextRun.customData.gameShort ?? nextRun.game ?? ""} ${nextRun.category ?? ""} by <span class="text-[#bbeee8ff] font-bold">${Helpers.formatPlayers(nextRun)}</span>`,
            );
          }
        } else {
          onEnd();
        }
      })
      .catch(() => {
        /* empty */
      });
  }, [onEnd]);

  if (!msg) return null;

  return (
    <ScrollingMessage
      containerRef={containerRef}
      message={msg}
      onEnd={onEnd}
      onScrollingNeeded={onScrollingNeeded}
      timeout={timeout}
    />
  );
}

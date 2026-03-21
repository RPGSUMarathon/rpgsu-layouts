import type { RunData } from "speedcontrol/src/types";
import type { RunDataActiveRunSurrounding } from "speedcontrol/src/types/schemas";
import { motion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Helpers } from "../../../../helpers";
import { timeToRun as timeToRunFunc } from "../../../../time-to-run";

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
  const [scrollDistance, setScrollDistance] = useState(0);

  const resizeObserverRef = useRef<ResizeObserver>();
  const textRef = useRef<HTMLDivElement>(null);
  const localContainerRef = useRef<HTMLDivElement>(null);
  const exitTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const [scrollMeasured, setScrollMeasured] = useState(false);

  const TOTAL_DISPLAY_TIME = 20;
  const START_PAUSE = 1;
  const SCROLL_DURATION = 18;

  useEffect(() => {
    onScrollingNeeded?.(scrollDistance > 0);
  }, [scrollDistance, onScrollingNeeded]);

  useLayoutEffect(() => {
    NodeCG.waitForReplicants(runDataArray, runDataActiveRunSurrounding)
      .then(() => {
        const nextRun = getNextRun();
        if (nextRun) {
          const timeToRun = timeToRunFunc(nextRun);
          if (timeToRun.length > 0) {
            setMsg(
              `Next run <span class="text-[#bbeee8ff] font-bold">${timeToRun}</span> - ${nextRun.customData.gameShort ?? nextRun.game} ${nextRun.category} by <span class="text-[#bbeee8ff] font-bold">${Helpers.formatPlayers(nextRun)}</span>`,
            );
          } else {
            setMsg(
              `Next run - ${nextRun.customData.gameShort ?? nextRun.game} ${nextRun.category} by <span class="text-[#bbeee8ff] font-bold">${Helpers.formatPlayers(nextRun)}</span>`,
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

  // For non-scrolling case only: exit after `timeout` ms once scroll is measured.
  useEffect(() => {
    if (!scrollMeasured) {
      return;
    }

    // Scrolling case is handled by onAnimationComplete instead.
    if (scrollDistance > 0) {
      return;
    }

    clearTimeout(exitTimeoutRef.current);
    exitTimeoutRef.current = setTimeout(() => {
      onEnd();
    }, timeout);

    return () => {
      clearTimeout(exitTimeoutRef.current);
    };
  }, [scrollMeasured, scrollDistance, timeout, onEnd]);

  useEffect(() => {
    const updateScrollDistance = () => {
      if (textRef.current && localContainerRef.current) {
        const textWidth = textRef.current.scrollWidth;
        const containerWidth =
          containerRef.current?.clientWidth ??
          localContainerRef.current.clientWidth;

        if (textWidth > containerWidth) {
          setScrollDistance(textWidth - (containerWidth - 60));
        } else {
          setScrollDistance(0);
        }
      }
      setScrollMeasured(true);
    };

    resizeObserverRef.current = new ResizeObserver(updateScrollDistance);
    if (textRef.current) {
      resizeObserverRef.current.observe(textRef.current);
    }

    updateScrollDistance();

    return () => {
      resizeObserverRef.current?.disconnect();
    };
  }, [msg, containerRef]);

  return (
    <div
      ref={localContainerRef}
      className="text-left min-w-full max-w-full w-full overflow-hidden relative whitespace-nowrap"
    >
      <motion.div
        ref={textRef}
        className="text-4xl inline-block align-top whitespace-nowrap"
        animate={
          scrollDistance > 0
            ? {
                x: [0, 0, -scrollDistance, -scrollDistance],
              }
            : {}
        }
        transition={
          scrollDistance > 0
            ? {
                ease: "linear",
                duration: TOTAL_DISPLAY_TIME,
                times: [
                  0,
                  START_PAUSE / TOTAL_DISPLAY_TIME,
                  (START_PAUSE + SCROLL_DURATION) / TOTAL_DISPLAY_TIME,
                  1,
                ],
              }
            : {}
        }
        onAnimationComplete={() => {
          if (scrollDistance > 0) {
            onEnd();
          }
        }}
        dangerouslySetInnerHTML={{ __html: msg }}
      />
    </div>
  );
}

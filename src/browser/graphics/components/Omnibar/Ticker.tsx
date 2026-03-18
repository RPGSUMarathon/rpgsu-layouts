import type { OmnibarTickerElements } from "@rpgsu-layouts/types";
import { useReplicant } from "@nodecg/react-hooks";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { OmnibarGenericMessage } from "./Ticker/GenericMessage";

export const OmnibarTicker = ({ className }: { className?: string }) => {
  // const [tickerElements] = useReplicant<OmnibarTickerElements[]>(
  //   "ticker-elements",
  //   { bundle: "rpgsu-layouts", defaultValue: [] },
  // );

  const tickerElements: OmnibarTickerElements[] = useMemo(
    () => [
      {
        type: "generic-message",
        message: "test1",
        timeout: 5000,
      },
      {
        type: "generic-message",
        message: "test2",
        timeout: 5000,
      },
    ],
    [],
  );

  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);
  const indexRef = useRef(0);

  const showNextElement = useCallback(() => {
    const elements = tickerElements ?? [];
    if (!elements.length) return;

    const nextIndex = indexRef.current % elements.length;
    indexRef.current = nextIndex + 1;
    setCurrentComponentIndex(nextIndex);
  }, [tickerElements]);

  useEffect(() => {
    showNextElement();
  }, [showNextElement]);

  const currentElement = tickerElements?.[currentComponentIndex];

  return (
    <div
      id="omnibar-ticker"
      className={`h-full flex flex-row flex-1 justify-center content-center items-center overflow-hidden ${className}`}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={currentComponentIndex}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.5 }}
        >
          {currentElement?.type === "generic-message" && (
            <OmnibarGenericMessage
              className="self-center"
              message={currentElement.message}
              onEnd={showNextElement}
              timeout={currentElement.timeout}
            />
          )}
          {currentElement?.type === "next-run" && <span />}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

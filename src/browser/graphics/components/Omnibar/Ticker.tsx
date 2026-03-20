import type { OmnibarTickerElement } from "@rpgsu-layouts/types";
import { useReplicant } from "@nodecg/react-hooks";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { OmnibarGenericMessage } from "./Ticker/GenericMessage";
import { NextRun } from "./Ticker/NextRun";

export const OmnibarTicker = ({ className }: { className?: string }) => {
  const [tickerElements] = useReplicant<OmnibarTickerElement[]>(
    "tickerElements",
    { bundle: "rpgsu-layouts", defaultValue: [] },
  );

  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);
  const indexRef = useRef(0);

  const tickerContainerRef = useRef(null);

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
      ref={tickerContainerRef}
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
          {currentElement?.type === "next-run" && (
            <NextRun
              onEnd={showNextElement}
              timeout={currentElement.timeout}
              containerRef={tickerContainerRef}
            />
          )}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

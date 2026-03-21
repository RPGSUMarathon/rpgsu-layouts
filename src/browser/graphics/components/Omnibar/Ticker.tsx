import { useReplicant } from "@nodecg/react-hooks";
import {
  type CurrentOBSScene,
  type OmnibarTickerElement,
} from "@rpgsu-layouts/types";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { OmnibarGenericMessage } from "./Ticker/GenericMessage";
import { NextRun } from "./Ticker/NextRun";

const { scenes } = nodecg.bundleConfig.obs;

export const OmnibarTicker = ({ className }: { className?: string }) => {
  const [tickerElements] = useReplicant<OmnibarTickerElement[]>(
    "tickerElements",
    { bundle: "rpgsu-layouts", defaultValue: [] },
  );
  const [currentOBSScene] = useReplicant<CurrentOBSScene>("currentOBSScene");

  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);

  const indexRef = useRef(0);

  const tickerContainerRef = useRef(null);

  const showNextElement = useCallback(() => {
    const elements = tickerElements ?? [];
    if (!elements.length) return;

    const visibleElements = elements.filter((el) => {
      const isHidden =
        (el.hideOnCountdown ?? false) && currentOBSScene === scenes?.countdown;
      return !isHidden;
    });

    if (!visibleElements.length) return;

    const visibleIndex = indexRef.current % visibleElements.length;
    const nextElement = visibleElements[visibleIndex]!;
    const originalIndex = elements.indexOf(nextElement);
    indexRef.current = visibleIndex + 1;
    setCurrentComponentIndex(originalIndex);
  }, [tickerElements, currentOBSScene]);

  useEffect(() => {
    showNextElement();
  }, [showNextElement]);

  const currentElement = tickerElements?.[currentComponentIndex];

  return (
    <div
      id="omnibar-ticker"
      className={`h-full mx-2 flex flex-row flex-1 justify-center content-center items-center overflow-hidden ${className}`}
      ref={tickerContainerRef}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={currentComponentIndex}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.5 }}
          className="block w-full"
        >
          {currentElement?.type === "generic-message" && (
            <OmnibarGenericMessage
              containerRef={tickerContainerRef}
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

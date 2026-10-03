import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface Props {
  timeout: number;
  message: string;
  onEnd: () => void;
  onScrollingNeeded?: (needsScrolling: boolean) => void;
  containerRef: React.RefObject<HTMLDivElement>;
}

const SCROLL_SPEED_PX_PER_SECOND = 90;
const START_PAUSE_SECONDS = 1;
const END_PAUSE_SECONDS = 1;
const END_PADDING_PX = 60;

export const ScrollingMessage = ({
  message,
  containerRef,
  timeout,
  onEnd,
  onScrollingNeeded,
}: Props) => {
  const [scrollDistance, setScrollDistance] = useState(0);
  const [scrollMeasured, setScrollMeasured] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const localContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onScrollingNeeded?.(scrollDistance > 0);
  }, [scrollDistance, onScrollingNeeded]);

  useEffect(() => {
    if (!scrollMeasured || scrollDistance > 0) return;

    const exitTimeout = setTimeout(onEnd, timeout);
    return () => clearTimeout(exitTimeout);
  }, [scrollMeasured, scrollDistance, timeout, onEnd]);

  useEffect(() => {
    const updateScrollDistance = () => {
      if (!textRef.current || !localContainerRef.current) return;

      const overflow =
        textRef.current.scrollWidth - localContainerRef.current.clientWidth;
      setScrollDistance(
        overflow > 0 ? Math.ceil(overflow + END_PADDING_PX) : 0,
      );
      setScrollMeasured(true);
    };

    const resizeObserver = new ResizeObserver(updateScrollDistance);
    resizeObserver.observe(textRef.current!);
    resizeObserver.observe(localContainerRef.current!);
    if (
      containerRef.current &&
      containerRef.current !== localContainerRef.current
    ) {
      resizeObserver.observe(containerRef.current);
    }

    updateScrollDistance();
    return () => resizeObserver.disconnect();
  }, [message, containerRef]);

  const scrollingSeconds = scrollDistance / SCROLL_SPEED_PX_PER_SECOND;
  const totalSeconds =
    START_PAUSE_SECONDS + scrollingSeconds + END_PAUSE_SECONDS;

  return (
    <div
      ref={localContainerRef}
      className="relative w-full min-w-full max-w-full overflow-hidden whitespace-nowrap text-left"
    >
      <motion.div
        ref={textRef}
        className="inline-block whitespace-nowrap align-top text-4xl"
        initial="measuring"
        animate={scrollDistance > 0 ? "scrolling" : "stationary"}
        variants={{
          measuring: { x: 0 },
          stationary: { x: 0, transition: { duration: 0 } },
          scrolling: {
            x: [0, 0, -scrollDistance, -scrollDistance],
            transition: {
              duration: totalSeconds,
              ease: "linear",
              times: [
                0,
                START_PAUSE_SECONDS / totalSeconds,
                (START_PAUSE_SECONDS + scrollingSeconds) / totalSeconds,
                1,
              ],
            },
          },
        }}
        style={{ willChange: scrollDistance > 0 ? "transform" : "auto" }}
        onAnimationComplete={(definition) => {
          if (definition === "scrolling") onEnd();
        }}
        dangerouslySetInnerHTML={{ __html: message }}
      />
    </div>
  );
};

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { CharityLogoContainer } from "./IntermissionInfo/CharityLogo";
import { LocationContainer } from "./IntermissionInfo/Location";
import { SocialMediaContainer } from "./IntermissionInfo/SocialMedia";

const infoElements = [
  <CharityLogoContainer key={0} />,
  <SocialMediaContainer key={1} />,
  <LocationContainer key={2} />,
];

export const IntermissionInfoContainer = () => {
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);
  const infoContainerRef = useRef(null);

  useEffect(() => {
    if (infoElements.length <= 1) return;

    const interval = setInterval(() => {
      if ("startViewTransition" in document) {
        (document as Document).startViewTransition(() => {
          setCurrentComponentIndex((prev) => (prev + 1) % infoElements.length);
        });
      } else {
        setCurrentComponentIndex((prev) => (prev + 1) % infoElements.length);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [infoElements.length]);

  return (
    <div
      className="ridge-inner w-full h-[290px] bg-(--color-offline-info) place-content-center p-5"
      ref={infoContainerRef}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentComponentIndex}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5 }}
          className="block w-full"
        >
          {infoElements[currentComponentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

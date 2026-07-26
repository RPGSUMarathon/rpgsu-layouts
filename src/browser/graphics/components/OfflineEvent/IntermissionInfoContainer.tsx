import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import ILGALogo from "../../img/offline2026/ilga-full-logo.png";

/**
   @todo: Intermissino Info Container
   Rotate with different info. Can be static?
**/

export const IntermissionInfoContainer = () => {
  const [currentComponentIndex] = useState(0);

  return (
    <div className="ridge-inner w-full h-[290px] bg-(--color-offline-info) place-content-center p-5">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentComponentIndex}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.5 }}
          className="block w-full"
        >
          <img src={ILGALogo} />
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

import { useEffect, useRef, useState } from "react";
import Logo from "../../img/text-banner.png";
import { CrossOverLogo } from "./CrossOverLogo";
import { IntermissionLogoSocialMedia } from "./IntermissionLogoSocialMedia";

export const RotatingImage = ({ className = "" }: { className?: string }) => {
  const [activeIndex, setActiveIndex] = useState<0 | 1 | 2>(1);
  const [isVisible, setIsVisible] = useState(true);
  const activeIndexRef = useRef<0 | 1 | 2>(1);

  const FADE_MS = 1000;
  const DISPLAY_MS = 15000;

  useEffect(() => {
    const cycle = () => {
      setIsVisible(false);

      setTimeout(() => {
        const next =
          activeIndexRef.current === 0
            ? 1
            : activeIndexRef.current === 1
              ? 2
              : 0;
        activeIndexRef.current = next as 0 | 1 | 2;
        setActiveIndex(next as 0 | 1 | 2);
        setIsVisible(true);
      }, FADE_MS);
    };

    const intervalId = window.setInterval(cycle, DISPLAY_MS + FADE_MS);

    return () => window.clearInterval(intervalId);
  }, []); // runs once only

  return (
    <div className={`grid place-items-center w-9/12 mx-auto ${className}`}>
      {/* Layer 1: IntermissionLogoImage */}
      <div
        className={`col-start-1 row-start-1 w-1/2 transition-opacity duration-1000 ${
          activeIndex === 0
            ? isVisible
              ? "opacity-100"
              : "opacity-0"
            : "opacity-0"
        }`}
      >
        <CrossOverLogo />
      </div>

      {/* Layer 2: Static Logo image */}
      <div
        className={`col-start-1 w-9/12 row-start-1  transition-opacity duration-1000 ${
          activeIndex === 1
            ? isVisible
              ? "opacity-100"
              : "opacity-0"
            : "opacity-0"
        }`}
      >
        <img src={Logo} alt="Logo" />
      </div>

      <div
        className={`col-start-1 row-start-1 transition-opacity duration-1000 ${
          activeIndex === 2
            ? isVisible
              ? "opacity-100"
              : "opacity-0"
            : "opacity-0"
        }`}
      >
        <IntermissionLogoSocialMedia />
      </div>
    </div>
  );
};

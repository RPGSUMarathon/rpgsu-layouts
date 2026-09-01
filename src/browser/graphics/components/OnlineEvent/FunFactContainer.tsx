import { AutoTextSize } from "auto-text-size";
import { useEffect, useMemo, useState } from "react";

export const FunFactContainer = ({ text }: { text: string }) => {
  const facts: string[] = useMemo(() => {
    if (!text) return [];
    try {
      const parsed = JSON.parse(text);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [text]);
  const factsLength = useMemo(() => facts.length, [facts]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentIndex(0);
  }, [facts]);

  useEffect(() => {
    if (facts.length <= 1) return;

    const interval = setInterval(() => {
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % factsLength);
      }, 500);
    }, 13000);

    return () => clearInterval(interval);
  }, [facts, factsLength]);

  return (
    <div className="mx-10 my-10 h-73 shadow-2xl inset-shadow-md inset-shadow-black border-7 border-[#375481] rounded-b-sm relative bg-[#141c2f]">
      <span className="pl-5 pr-8 py-2 text-3xl bg-[#5775a4] absolute -top-6.25 -left-7.5 rounded-sm w-140 font-normal italic">
        Did you know...
      </span>
      <div className="absolute text-center flex flex-col items-center justify-center place-content-center h-65 top-6">
        <AutoTextSize
          className="font-light px-1"
          mode="box"
          minFontSizePx={18}
          maxFontSizePx={40}
        >
          {facts[currentIndex]}
        </AutoTextSize>
      </div>
    </div>
  );
};

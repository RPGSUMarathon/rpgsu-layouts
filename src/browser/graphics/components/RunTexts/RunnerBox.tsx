import { useEffect, useMemo, useState } from "react";
import Bluesky from "../../img/icons/bluesky.png";
import Mic from "../../img/icons/mic.png";
import Runner from "../../img/icons/runner.png";
import Twitch from "../../img/icons/twitch.png";
import Youtube from "../../img/icons/youtube.png";

type Props = {
  bluesky?: string;
  className?: string;
  name: string;
  pronouns?: string;
  runner: boolean;
  textSize?: string;
  twitch?: string;
  youtube?: string;
};

export const RunnerBox = ({
  pronouns,
  name,
  runner,
  className,
  textSize,
  twitch,
  youtube,
  bluesky,
}: Props) => {
  const [index, setIndex] = useState(0);

  const slides = useMemo(() => {
    const items = [];

    items.push({
      key: "name",
      content: (
        <span className="drop-shadow-xs drop-shadow-black ml-6">{name}</span>
      ),
    });

    if (twitch) {
      items.push({
        key: "twitch",
        content: (
          <>
            <img
              className="h-6 ml-2 drop-shadow-xs drop-shadow-black"
              src={Twitch}
              alt="Twitch"
            />
            <span className="drop-shadow-xs drop-shadow-black">{twitch}</span>
          </>
        ),
      });
    }

    if (youtube) {
      items.push({
        key: "youtube",
        content: (
          <>
            <img
              className="h-6 ml-2  drop-shadow-xs drop-shadow-black"
              src={Youtube}
              alt="YouTube"
            />
            <span className="drop-shadow-xs drop-shadow-black">{youtube}</span>
          </>
        ),
      });
    }

    if (bluesky) {
      items.push({
        key: "bluesky",
        content: (
          <>
            <img
              className="h-6 ml-2  drop-shadow-xs drop-shadow-black"
              src={Bluesky}
              alt="Bluesky"
            />
            <span className="drop-shadow-xs drop-shadow-black">{bluesky}</span>
          </>
        ),
      });
    }

    return items;
  }, [name, twitch, youtube, bluesky]);

  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      if ("startViewTransition" in document) {
        (document as Document).startViewTransition(() => {
          setIndex((prev) => (prev + 1) % slides.length);
        });
      } else {
        setIndex((prev) => (prev + 1) % slides.length);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div
      className={`w-full h-12.5 border-b-3 border-white bg-[#278178] relative flex items-center ${className ?? ""}`}
    >
      {pronouns && (
        <div className="absolute capitalize bottom-0 right-0 bg-black/70 text-white text-xs px-2 py-0.5">
          {pronouns}
        </div>
      )}

      <img src={runner ? Runner : Mic} className="ml-3 h-5/6" alt="Icon" />

      <div
        className={`absolute left-14 top-1.25 flex items-center gap-2 text-white drop-shadow ${
          textSize ? `text-${textSize}` : "text-2xl"
        }`}
        style={{ viewTransitionName: "runner-content" }}
      >
        {slides[index]?.content}
      </div>
    </div>
  );
};

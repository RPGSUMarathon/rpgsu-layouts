import { useReplicant } from "@nodecg/react-hooks";
import { AnimatePresence, motion } from "motion/react";
import Bluesky from "../../img/icons/bluesky.png";
import MicIcon from "../../img/icons/mic.png";
import RunnerIcon from "../../img/icons/runner.png";
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
  visibleListItem: number;
  youtube?: string;
};

export const RunnerBox = ({
  pronouns,
  name,
  className,
  textSize,
  twitch,
  runner,
  youtube,
  bluesky,
  visibleListItem,
}: Props) => {
  const [iconToggleOn] = useReplicant<boolean>("iconToggleOn", {
    defaultValue: false,
  });

  const slides = [
    <span
      key="runnerBoxNameRef"
      className="drop-shadow-xs drop-shadow-black ml-6"
    >
      {name}
    </span>,
    <div key="runnerBoxTwitchRef" className="flex flex-row gap-3 items-center">
      <img
        className="h-6 ml-2 drop-shadow-xs drop-shadow-black"
        src={Twitch}
        alt="Twitch"
      />
      <span className="drop-shadow-xs drop-shadow-black">{twitch}</span>
    </div>,
    <div key="runnerBoxYoutubeRef" className="flex flex-row gap-3 items-center">
      <img
        className="h-6 ml-2  drop-shadow-xs drop-shadow-black"
        src={Youtube}
        alt="YouTube"
      />
      <span className="drop-shadow-xs drop-shadow-black">{youtube}</span>
    </div>,
    <div key="runnerBoxBluesktRef" className="flex flex-row gap-3 items-center">
      <img
        className="h-6 ml-2  drop-shadow-xs drop-shadow-black"
        src={Bluesky}
        alt="Bluesky"
      />
      <span className="drop-shadow-xs drop-shadow-black">{bluesky}</span>
    </div>,
  ];

  return (
    <div
      className={`w-full h-12.5 theme-border-box theme-border-b bg-(--color-world-main) relative flex items-center ${className ?? ""}`}
    >
      {pronouns && (
        <div className="absolute capitalize bottom-0 right-0 bg-black/70 text-white text-xs px-2 py-0.5">
          {pronouns}
        </div>
      )}

      {iconToggleOn && (
        <img
          src={runner ? RunnerIcon : MicIcon}
          className="ml-3 h-5/6"
          alt="Icon"
        />
      )}

      <div
        className={`absolute left-14 top-1.25 flex items-center gap-2 text-white drop-shadow ${
          textSize ? `text-${textSize}` : "text-2xl"
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={visibleListItem}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="block w-full"
          >
            {slides[visibleListItem]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

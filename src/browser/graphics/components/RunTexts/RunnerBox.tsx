import { useReplicant } from "@nodecg/react-hooks";
import { type Channel } from "@rpgsu-layouts/types/custom/channel";
import { AnimatePresence, motion } from "motion/react";
import { HiOutlineStatusOnline } from "react-icons/hi";
import Bluesky from "../../img/icons/bluesky.png";
import CommIdle from "../../img/icons/speaking/comm-idle.png";
import CommSpeaking from "../../img/icons/speaking/comm-speaking.png";
import RunnerIdle from "../../img/icons/speaking/runner-idle.png";
import RunnerSpeaking from "../../img/icons/speaking/runner-speaking.png";
import Twitch from "../../img/icons/twitch.png";
import Youtube from "../../img/icons/youtube.png";

type Props = {
  bluesky?: string;
  channel: Channel;
  className?: string;
  name: string;
  pronouns?: string;
  remote: boolean;
  runner: boolean;
  textSize?: string;
  twitch?: string;
  vdoEnabled?: boolean;
  vdoId?: string | null;
  visibleListItem: number;
  youtube?: string;
};

const SpeakerIcons = {
  runnerIdle: "https://imgur.com/FU00lok.png",
  runnerSpeaking: "https://i.imgur.com/Mq6A4L2.png",
  commIdle: "https://i.imgur.com/dgYkFvR.png",
  commSpeaking: "https://i.imgur.com/wf2hTbI.png",
};

const RunnerReactiveIcon = ({
  signalLevel,
  thresholdLevel,
}: {
  signalLevel: number;
  thresholdLevel: number;
}) => {
  return (
    <img
      src={signalLevel < thresholdLevel ? RunnerIdle : RunnerSpeaking}
      className="ml-3 h-5/6"
      alt="Icon"
    />
  );
};

const CommReactiveIcon = ({
  signalLevel,
  thresholdLevel,
}: {
  signalLevel: number;
  thresholdLevel: number;
}) => {
  return (
    <img
      src={signalLevel < thresholdLevel ? CommIdle : CommSpeaking}
      className="ml-3 h-5/6"
      alt="Icon"
    />
  );
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
  channel,
  vdoEnabled = false,
  vdoId,
  remote,
}: Props) => {
  const [iconToggleOn] = useReplicant<boolean>("iconToggleOn", {
    defaultValue: false,
  });
  const [mixerSignalLevels] = useReplicant<
    { [key in Channel]: number } | undefined
  >("mixerSignalLevels", undefined);
  const [mixerThresholdLevels] = useReplicant<
    { [key in Channel]: number } | undefined
  >("mixerThresholdLevels", undefined);

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

      {vdoEnabled && vdoId ? (
        <div className="h-full w-12.5 ml-3 overflow-hidden">
          <iframe
            className="relative top-[-33px] left-[-6px]"
            width={50}
            height={113}
            src={`
        https://vdo.ninja/?view=${vdoId}&solo=1&room=RPGSU&password=RPGSU&transparency&novideo&meterstyle=5&bgimage=${runner ? SpeakerIcons.runnerIdle : SpeakerIcons.commIdle}&bgimage2=${runner ? SpeakerIcons.runnerSpeaking : SpeakerIcons.commSpeaking}&bgimage3=${runner ? SpeakerIcons.runnerSpeaking : SpeakerIcons.commSpeaking}`}
          />
        </div>
      ) : (
        iconToggleOn &&
        (runner ? (
          <RunnerReactiveIcon
            signalLevel={
              (mixerSignalLevels && mixerSignalLevels[channel]) ?? -Infinity
            }
            thresholdLevel={
              (mixerThresholdLevels && mixerThresholdLevels[channel]) ??
              Infinity
            }
          />
        ) : (
          <CommReactiveIcon
            signalLevel={
              (mixerSignalLevels && mixerSignalLevels[channel]) ?? -Infinity
            }
            thresholdLevel={
              (mixerThresholdLevels && mixerThresholdLevels[channel]) ??
              Infinity
            }
          />
        ))
      )}

      {remote && (
        <div className="absolute right-[70px]">
          <HiOutlineStatusOnline size={30} />
        </div>
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

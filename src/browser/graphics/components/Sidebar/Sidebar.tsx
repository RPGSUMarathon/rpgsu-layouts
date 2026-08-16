import { useReplicant } from "@nodecg/react-hooks";
import { useEffect, useState } from "react";
import useCameraOn from "../../../hooks/useCameraOn";
import useCommentators from "../../../hooks/useCommentators";
import useCurrentRun from "../../../hooks/useCurrentRun";
import { RunnerBox } from "../../components/RunTexts/RunnerBox";
import backgroundImage from "../../img/offline2026/offline-background.png";
import { NoCamera } from "../NoCamera";

export const Sidebar = () => {
  const currentRun = useCurrentRun();
  const cameraOn = useCameraOn();
  const commentators = useCommentators();
  const [backgroundToggleOn] = useReplicant<boolean>("backgroundToggleOn", {
    defaultValue: false,
  });
  const [runnerBoxContentIndex, setRunnerBoxContentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if ("startViewTransition" in document) {
        (document as Document).startViewTransition(() => {
          setRunnerBoxContentIndex((prev) => (prev + 1) % 2);
        });
      } else {
        setRunnerBoxContentIndex((prev) => (prev + 1) % 2);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const player = currentRun?.teams[0]?.players[0];

  return (
    <div className="flex h-222.5 theme-border-box bg-(--color-world-bg)">
      <div
        className="flex flex-col w-112.5 h-full  theme-border-r"
        style={{
          backgroundImage: backgroundToggleOn
            ? `url(${backgroundImage})`
            : "none",
        }}
      >
        {cameraOn && cameraOn ? (
          <div
            id="CameraBox"
            className="w-full h-84.25 theme-border-box  theme-border-b"
          />
        ) : (
          <div className="h-84.25 theme-border-box theme-border-b">
            <NoCamera />
          </div>
        )}
        <div className="h-138.25">
          <RunnerBox
            twitch={player?.social.twitch}
            youtube={player?.social.youtube}
            runner
            pronouns={player?.pronouns}
            name={player?.name ?? ""}
            visibleListItem={runnerBoxContentIndex}
          />
          {commentators.length > 0 && (
            <div className="flex-1 w-full">
              {commentators.map((runner) => (
                <RunnerBox
                  runner={false}
                  pronouns={runner.pronouns}
                  name={runner.name}
                  key={runner.id}
                  twitch={runner.twitch}
                  bluesky={runner.bluesky}
                  visibleListItem={runnerBoxContentIndex}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

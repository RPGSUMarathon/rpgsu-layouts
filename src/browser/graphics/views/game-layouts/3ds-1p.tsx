import { useReplicant } from "@nodecg/react-hooks";
import useCameraOn from "../../../hooks/useCameraOn";
import useCommentators from "../../../hooks/useCommentators";
import useCurrentRun from "../../../hooks/useCurrentRun";
import { Header } from "../../components/Header/Header";
import { NoCamera } from "../../components/NoCamera";
import { RunnerBox } from "../../components/RunTexts/RunnerBox";
import backgroundImage from "../../img/offline2026/offline-background.png";

export const Center3DS = () => {
  const currentRun = useCurrentRun();
  const cameraOn = useCameraOn();
  const commentators = useCommentators();
  const [backgroundToggleOn] = useReplicant<boolean>("backgroundToggleOn", {
    defaultValue: false,
  });

  const player = currentRun?.teams[0]?.players[0];

  return (
    <div className="flex h-222.5">
      <div className="flex-none w-112.5 h-full theme-border-r theme-border-box">
        {cameraOn && cameraOn ? (
          <div id="CameraBox" className="w-full h-84.25 theme-border-b" />
        ) : (
          <div className="h-84.25 theme-border-b">
            <NoCamera />
          </div>
        )}
        <div
          className="h-54 bg-(--color-world-bg)"
          style={{
            backgroundImage: backgroundToggleOn
              ? `url(${backgroundImage})`
              : "none",
          }}
        >
          <RunnerBox
            twitch={player?.social.twitch}
            youtube={player?.social.youtube}
            runner
            pronouns={player?.pronouns}
            name={player?.name ?? ""}
          />
          {commentators.length > 0 && (
            <div className="flex-1 h-47.5 w-full">
              {commentators.map((runner) => (
                <RunnerBox
                  runner={false}
                  className="flex-none"
                  pronouns={runner.pronouns}
                  name={runner.name}
                  key={runner.id}
                  twitch={runner.twitch}
                  bluesky={runner.bluesky}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="h-84.25 absolute w-112.5 bottom-[60px] left-0 theme-border-t theme-border-box" />
      <div className="flex-none h-full aspect-5/3 theme-border-box" />
    </div>
  );
};

export const L3ds_1P = () => {
  return (
    <>
      <Header />
      <Center3DS />
    </>
  );
};

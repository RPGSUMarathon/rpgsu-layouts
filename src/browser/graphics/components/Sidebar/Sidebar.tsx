import { useReplicant } from "@nodecg/react-hooks";
import useCameraOn from "../../../hooks/useCameraOn";
import useCommentators from "../../../hooks/useCommentators";
import useCurrentRun from "../../../hooks/useCurrentRun";
import { RunnerBox } from "../../components/RunTexts/RunnerBox";
import backgroundImage from "../../img/online-background.png";
import { NoCamera } from "../NoCamera";

export const Sidebar = () => {
  const currentRun = useCurrentRun();
  const cameraOn = useCameraOn();
  const commentators = useCommentators();
  const [backgroundToggleOn] = useReplicant<boolean>("backgroundToggleOn", {
    defaultValue: false,
  });

  const player = currentRun?.teams[0]?.players[0];

  return (
    <div className="flex h-222.5">
      <div
        className="flex flex-col w-112.5 h-full border-r-5 border-white"
        style={{
          backgroundImage: backgroundToggleOn
            ? `url(${backgroundImage})`
            : "none",
        }}
      >
        {cameraOn && cameraOn ? (
          <div
            id="CameraBox"
            className="w-full h-84.25  border-b-5 border-white"
          />
        ) : (
          <div className="h-84.25  border-b-5 border-white">
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
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

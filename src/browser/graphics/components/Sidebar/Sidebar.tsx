import useCameraOn from "../../../hooks/useCameraOn";
import useCommentators from "../../../hooks/useCommentators";
import useCurrentRun from "../../../hooks/useCurrentRun";
import { RunnerBox } from "../../components/RunTexts/RunnerBox";
import Background from "../../img/online-background.png";
import { NoCamera } from "../NoCamera";

export const Sidebar = () => {
  const currentRun = useCurrentRun();
  const cameraOn = useCameraOn();
  const commentators = useCommentators();

  const player = currentRun?.teams[0]?.players[0];

  return (
    <div className="flex h-[890px]">
      <div className="flex flex-col w-112.5 h-full border-r-5 border-white">
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
        <div
          className="h-140.5"
          style={{ backgroundImage: `url(${Background})` }}
        >
          <RunnerBox
            twitch={player?.social.twitch}
            youtube={player?.social.youtube}
            runner
            pronouns={player?.pronouns}
            name={player?.name ?? ""}
          />
          {commentators.length > 0 ? (
            <div className="flex-1 w-full">
              {commentators.map((runner) => (
                <RunnerBox
                  runner={false}
                  className="flex-none"
                  pronouns={runner.pronouns}
                  name={runner.name}
                />
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

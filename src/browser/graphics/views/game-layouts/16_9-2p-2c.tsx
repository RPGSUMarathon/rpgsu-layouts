import useCameraOn from "../../../hooks/useCameraOn";
import useCommentators from "../../../hooks/useCommentators";
import useCurrentRun from "../../../hooks/useCurrentRun";
import { Header } from "../../components/Header/Header";
import { NoCamera } from "../../components/NoCamera";
import { RunnerBox } from "../../components/RunTexts/RunnerBox";
import { TeamTimer } from "../../components/RunTexts/TeamTimer";
import { ThemeProvider } from "../../components/theme-provider";
import background from "../../img/online-background.png";

const BottomBar = () => {
  const currentRun = useCurrentRun();
  const cameraOn = useCameraOn();
  const commentators = useCommentators();

  const player1 = currentRun?.teams[0]?.players[0];
  const player2 = currentRun?.teams[1]?.players[0];

  return (
    <div className="h-93.5 w-full inline-flex">
      {/*Camera 1*/}
      {cameraOn && cameraOn ? (
        <div className="w-124.5 h-full border-white border-r-5" />
      ) : (
        <div className="w-124.5 h-full border-white border-r-5">
          <NoCamera />
        </div>
      )}

      <div
        className="w-231 h-full relative"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="absolute top-0 left-0 w-111.5 border-r-5 border-white">
          <RunnerBox
            twitch={player1?.social.twitch}
            youtube={player1?.social.youtube}
            runner
            pronouns={player1?.pronouns}
            name={player1?.name ?? ""}
          />
        </div>

        <div className="w-111.5 absolute top-34.25 left-59.75 ">
          {commentators.map((runner) => (
            <RunnerBox
              key={runner.id}
              className="border-l-3 border-r-3 border-t-3 border-white"
              runner={false}
              pronouns={runner.pronouns}
              name={runner.name}
              twitch={runner.twitch}
              bluesky={runner.bluesky}
            />
          ))}
        </div>

        <div className="absolute bottom-0 right-0 w-111.5 border-t-5 border-l-5 border-white">
          <RunnerBox
            twitch={player2?.social.twitch}
            youtube={player2?.social.youtube}
            runner
            pronouns={player2?.pronouns}
            name={player2?.name ?? ""}
          />
        </div>
      </div>
      {/*Camera 2*/}
      {cameraOn && cameraOn ? (
        <div className="w-124.5 h-full border-white border-l-5 " />
      ) : (
        <div className="w-124.5 h-full border-white border-l-5">
          <NoCamera />
        </div>
      )}
    </div>
  );
};

export const L16x9_2P_2C = () => {
  return (
    <ThemeProvider>
      <Header />
      <div className="h-[531px] w-full relative">
        <div className="h-full w-[944px]  border-white border-r-5 border-b-5 relative">
          <TeamTimer slot={0} classname="absolute bottom-0 right-0 mx-2" />
        </div>
        <div className="h-full w-[944px]  border-white border-l-5 border-b-5 absolute right-0 top-0">
          <TeamTimer slot={1} classname="absolute bottom-0 left-0 mx-2" />
        </div>
      </div>
      <BottomBar />
    </ThemeProvider>
  );
};

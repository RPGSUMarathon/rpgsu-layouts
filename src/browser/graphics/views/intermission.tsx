import { useReplicant } from "@nodecg/react-hooks";
import useCommentators from "../../../browser/hooks/useCommentators";
import useCurrentRun from "../../hooks/useCurrentRun";
import useUpcomingRuns from "../../hooks/useUpcomingRuns";
import { render } from "../../render";
import { BossCounterContainer } from "../components/OfflineEvent/BossCounterContainer";
import { RunContainer } from "../components/OfflineEvent/CurrentRunContainer";
import { DonationContainer } from "../components/OfflineEvent/DonationContainer";
import { IntermissionInfoContainer } from "../components/OfflineEvent/IntermissionInfoContainer";
import { MusicPlayerContainer } from "../components/OfflineEvent/MusicPlayerContainer";
import { UpcomingCutsceneContainer, UpcomingRunContainer } from "../components/OfflineEvent/UpcomingRunContainer";
import { ThemeProvider } from "../components/theme-provider";

const Intermission = () => {
  const currentRun = useCurrentRun();
  const commentators = useCommentators();
  const upcomingRuns = useUpcomingRuns(2, currentRun?.id ?? "");

  const [world] = useReplicant<string>("currentWorld", {
    defaultValue: "1",
  });

  const exampleDonation =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dictum sapien ut nisi accumsan vehicula. Nam sollicitudin neque enim, eget massa nunc. ";
  return (
    <ThemeProvider
      theme="offline"
      world={world}
      className=""
      style={{ backgroundImage: `` }}
    >
      <div className="flex flex-row">
        <div className="w-[395px] h-[520px] bg-(--color-panel-dark) box2" />
        <div className="w-[1490px] h-[520px] flex flex-col">
          <div className="w-full h-[50px] bg-(--color-panel-dark) box2 text-center">
            <span className="engraved">RPGSU OFFLINE 2026</span>
          </div>
          <BossCounterContainer currentRunId={currentRun?.id ?? "No ID"} />
        </div>
        <div className="w-[395px] h-[520px] bg-(--color-panel-dark) box2-inverted" />
      </div>
      <div className="bottom-[60px] h-[500px] w-full absolute flex flex-row bg-black space-x-1 ">
        <div className="h-full w-[500px] space-y-1 ">
          <IntermissionInfoContainer />
          <MusicPlayerContainer />
        </div>
        <div className="h-full w-[892px] flex flex-col ">
          {currentRun && <RunContainer index={0} runData={currentRun} />}
          {upcomingRuns && upcomingRuns.length > 0 && (
            <>
              {upcomingRuns.map((run, index) => {
                if ((run?.customData.layout ?? "1").includes("Cutscene")) {
                  return <UpcomingCutsceneContainer key={run.id} />;
                } else {
                  return (
                    <UpcomingRunContainer
                      key={run.id}
                      index={index}
                      runData={run}
                    />
                  );
                }
              })}
            </>
          )}
        </div>
        <div className="h-full w-[528px] box2 bg-offline-omnibar">
          <div className="w-full ridge-inner text-center">
            <h2 className="text-5xl p-1">Donations</h2>
            {commentators.length > 0 && (
              <div className="w-full space-y-2 px-3 overflow-y-hidden">
                {commentators.map((runner) => (
                  <DonationContainer
                    key={runner.id}
                    name={runner.name}
                    amount="9999"
                    message={exampleDonation}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

render(<Intermission />);

import { useReplicant } from "@nodecg/react-hooks";
import useCommentators from "../../../browser/hooks/useCommentators";
import useCurrentRun from "../../hooks/useCurrentRun";
import useUpcomingRuns from "../../hooks/useUpcomingRuns";
import { render } from "../../render";
import { RunContainer } from "../components/OfflineEvent/CurrentRunContainer";
import { DonationContainer } from "../components/OfflineEvent/DonationContainer";
import { IntermissionInfoContainer } from "../components/OfflineEvent/IntermissionInfoContainer";
import { MusicPlayerContainer } from "../components/OfflineEvent/MusicPlayerContainer";
import { UpcomingRunContainer } from "../components/OfflineEvent/UpcomingRunContainer";
import { ThemeProvider } from "../components/theme-provider";

const Intermission = () => {
  const currentRun = useCurrentRun();
  const commentators = useCommentators();
  const upcomingRuns = useUpcomingRuns(2, currentRun?.id ?? "");

  const [world] = useReplicant<number>("currentWorld", {
    defaultValue: 1,
  });

  const exampleDonation =
    "Thank you guys so much for putting together an RPG event, it's really cool and and Im very grateful to be part of it and Im expressing it through this very long message.";

  return (
    <ThemeProvider world={world} className="" style={{ backgroundImage: `` }}>
      <div className="flex flex-row">
        <div className="w-[395px] h-[520px] bg-(--color-panel-dark) box2" />
        <div className="w-[1490px] h-[520px]  relative">
          <div className="absolute w-full h-[30px] bg-(--color-panel-dark) box2" />
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
                return (
                  <UpcomingRunContainer
                    key={run.id}
                    index={index}
                    runData={run}
                  />
                );
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

import useCommentators from "../../../browser/hooks/useCommentators";
import useCurrentRun from "../../hooks/useCurrentRun";
import useUpcomingRuns from "../../hooks/useUpcomingRuns";
import { render } from "../../render";
import { RunContainer } from "../components/OfflineEvent/CurrentRunContainer";
import { DonationContainer } from "../components/OfflineEvent/DonationContainer";
import { MusicPlayerContainer } from "../components/OfflineEvent/MusicPlayerContainer";
import { UpcomingRunContainer } from "../components/OfflineEvent/UpcomingRunContainer";
import { ThemeProvider } from "../components/theme-provider";

const Intermission = () => {
  const currentRun = useCurrentRun();
  const commentators = useCommentators();
  const upcomingRuns = useUpcomingRuns(2, currentRun?.id ?? "");

  const exampleDonation =
    "Thank you guys so much for putting together an RPG event, it's really cool and and Im very grateful to be part of it and Im expressing it through this very long message.";

  return (
    <ThemeProvider className="" style={{ backgroundImage: `` }}>
      <div className="flex flex-row">
        <div className="w-[395px] h-[520px] box2" />
        <div className="w-[1490px] h-[520px] relative">
          <div className="absolute w-full h-[30px] box2" />
          <div className="absolute w-full h-[30px] box2 bottom-0" />
        </div>
        <div className="w-[395px] h-[520px]  box2-inverted" />
      </div>
      <div className="bottom-[60px] h-[500px] w-full absolute flex flex-row ">
        <div className="h-full w-[892px] flex flex-col">
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
        <div className="h-full w-[528px] bg-[#6e7c9c] box2">
          <div className="w-full ridge-inner text-center">
            <h2 className="text-5xl p-1">Donations</h2>
            {commentators.length > 0 && (
              <div className="w-full">
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
        <div className="h-full w-[500px] bg-green-50 box2">
          <div className="ridge-inner w-full h-[300px]" />
          <MusicPlayerContainer />
        </div>
      </div>
    </ThemeProvider>
  );
};

render(<Intermission />);

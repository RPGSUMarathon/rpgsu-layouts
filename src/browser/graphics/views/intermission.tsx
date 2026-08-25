import { useReplicant } from "@nodecg/react-hooks";
import { motion } from "motion/react";
import useCommentators from "../../../browser/hooks/useCommentators";
import useCurrentRun from "../../hooks/useCurrentRun";
import useUpcomingRuns from "../../hooks/useUpcomingRuns";
import { render } from "../../render";
import { BossCounterContainer } from "../components/OfflineEvent/BossCounterContainer";
import { RunContainer } from "../components/OfflineEvent/CurrentRunContainer";
import { DonationContainer } from "../components/OfflineEvent/DonationContainer";
import { IntermissionInfoContainer } from "../components/OfflineEvent/IntermissionInfoContainer";
import { MusicPlayerContainer } from "../components/OfflineEvent/MusicPlayerContainer";
import {
  UpcomingCutsceneContainer,
  UpcomingRunContainer,
} from "../components/OfflineEvent/UpcomingRunContainer";
import { ThemeProvider } from "../components/theme-provider";
import Logo from "../img/logo-intermission.png";

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
      <div className="absolute top-0 left-0">
        <img src={Logo} />
      </div>
      <div className="flex flex-row">
        <div className="w-full h-[520px] flex flex-col">
          <BossCounterContainer currentRunId={currentRun?.id ?? "No ID"} />
        </div>
      </div>
      <div className="bottom-[60px] h-[500px] w-full absolute flex flex-row bg-black space-x-1 ">
        <div className="h-full w-[500px] space-y-1 ">
          <IntermissionInfoContainer />
          <MusicPlayerContainer />
        </div>
        <div className="h-full w-[892px] flex flex-col bg-(--color-world-bg)">
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
                  <motion.div
                    key={runner.id}
                    layout
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      layout: { duration: 0.3 },
                      type: "spring",
                      stiffness: 400,
                      damping: 20,
                    }}
                  >
                    <DonationContainer
                      name={runner.name}
                      amount="9999"
                      message={exampleDonation}
                    />
                  </motion.div>
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

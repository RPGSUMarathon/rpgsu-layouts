import { useReplicant } from "@nodecg/react-hooks";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import useCurrentRun from "../../hooks/useCurrentRun";
import useProcessedDonations from "../../hooks/useDonations";
import usePolls from "../../hooks/usePolls";
import useUpcomingRuns from "../../hooks/useUpcomingRuns";
import { render } from "../../render";
import { BossCounterContainer } from "../components/OfflineEvent/BossCounterContainer";
import { RunContainer } from "../components/OfflineEvent/CurrentRunContainer";
import { DonationContainer } from "../components/OfflineEvent/DonationContainer";
import { IncentiveContainer } from "../components/OfflineEvent/IncentiveContainer";
import { IntermissionInfoContainer } from "../components/OfflineEvent/IntermissionInfoContainer";
import { MusicPlayerContainer } from "../components/OfflineEvent/MusicPlayerContainer";
import {
  UpcomingCutsceneContainer,
  UpcomingRunContainer,
} from "../components/OfflineEvent/UpcomingRunContainer";
import { ThemeProvider } from "../components/theme-provider";
import Logo from "../img/logo-intermission.png";

const PANEL_INTERVAL_MS = 15_000;

const Intermission = () => {
  const currentRun = useCurrentRun();
  const upcomingRuns = useUpcomingRuns(2, currentRun?.id ?? "");
  const donations = useProcessedDonations();
  const polls = usePolls();
  const [panelIndex, setPanelIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPanelIndex((currentIndex) => (currentIndex + 1) % 2);
    }, PANEL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  const [world] = useReplicant<string>("currentWorld", {
    defaultValue: "1",
  });

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
        <div className="relative h-full w-[528px] overflow-hidden box2 bg-offline-omnibar">
          <AnimatePresence initial={false}>
            <motion.div
              key={panelIndex}
              className="absolute inset-0 overflow-hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {panelIndex === 0 ? (
                <div className="h-full w-full ridge-inner text-center">
                  <h2 className="text-5xl p-1">Donations</h2>
                  {donations.length > 0 && (
                    <div className="w-full space-y-2 px-3 overflow-y-hidden">
                      {donations.map((donation) => (
                        <motion.div
                          key={donation.id}
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
                            name={donation.name}
                            amount={donation.amount}
                            currency={donation.currency}
                            message={donation.comment}
                          />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full w-full ridge-inner text-center">
                  <h2 className="text-5xl p-1">Incentives</h2>
                  {polls.length > 0 && (
                    <div className="w-full space-y-2 px-3 overflow-y-hidden">
                      {polls.map((poll) => (
                        <IncentiveContainer key={poll.id} poll={poll} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </ThemeProvider>
  );
};

render(<Intermission />);

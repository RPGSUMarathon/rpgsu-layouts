import { Alert, Button, Stack, styled } from "@mui/material";
import { useReplicant } from "@nodecg/react-hooks";
import { useMemo } from "react";
import { type RunData } from "speedcontrol/src/types";
import { type Timer } from "speedcontrol/src/types/schemas";
import useCurrentObsScene from "../hooks/useCurrentObsScene";
import useCurrentRun from "../hooks/useCurrentRun";
import useNextRun from "../hooks/useNextRun";
import { render } from "../render";
import { DashboardThemeProvider } from "./components/DashboardThemeProvider";

const intermissionSceneName = nodecg.bundleConfig.obs.scenes?.intermission;

const getNextRunGameName = (run?: RunData) => {
  if (run && run.game) {
    return `${run.game.slice(0, 35)}${run.game.length > 35 ? "..." : ""}`;
  }
  return "Break";
};

const Paragraph = styled("p")(({ theme }) => ({
  ...theme.typography.button,
}));

export const NextRun = () => {
  const currentObsScene = useCurrentObsScene();
  const currentRun = useCurrentRun();
  const nextRun = useNextRun();

  const [timer] = useReplicant<Timer | undefined>("timer", {
    bundle: "nodecg-speedcontrol",
  });
  const [currentWorld, setWorld] = useReplicant<string>("currentWorld", {
    defaultValue: "1",
  });

  const nextRunGameName = useMemo(() => getNextRunGameName(nextRun), [nextRun]);

  const currentRunIsCutscene =
    (currentRun?.customData?.layout ?? "").includes("Cutscene") ?? false;

  const disableChange =
    (timer && ["running", "paused"].includes(timer.state)) ??
    currentObsScene === intermissionSceneName;

  return (
    <DashboardThemeProvider>
      <Stack spacing={2}>
        <h2>Current Scene: {currentObsScene}</h2>
        <Button
          variant="contained"
          fullWidth
          disabled={!nextRun}
          onClick={() => {
            if (nextRun) {
              void nodecg.sendMessage("switchToIntermissionWithAnimation");
            }
          }}
        >
          <span>Transition to Intermission</span>
        </Button>
        <Button
          variant="contained"
          fullWidth
          disabled={(disableChange || currentRunIsCutscene) ?? !nextRun}
          onClick={() => {
            void nodecg.sendMessage("switchToGame");
          }}
        >
          <span>Transition to Game</span>
        </Button>
        <Button
          variant="contained"
          fullWidth
          disabled={
            (disableChange ||
              !currentRunIsCutscene ||
              currentObsScene.includes("Cutscene")) ??
            !nextRun
          }
          onClick={() => {
            console.log(nextRun?.customData?.layout);
            if (currentRun?.customData?.layout != null) {
              void nodecg.sendMessage(
                "switchToCutscene",
                currentRun?.customData?.layout,
              );

              if (currentWorld !== (nextRun?.customData?.world ?? "1")) {
                setWorld(nextRun?.customData?.world ?? "1");
                void nodecg.sendMessage(
                  "switchToNextWorld",
                  nextRun?.customData?.world,
                );
              }
            }
          }}
        >
          <span>Transition to Cutscene</span>
        </Button>
        <Button
          variant="contained"
          fullWidth
          disabled={disableChange ?? !nextRun}
          onClick={() => {
            void nodecg.sendMessage("switchToTechIssues");
          }}
        >
          <span>Transition to Tech Issues</span>
        </Button>
        {disableChange && (
          <Alert variant="filled" severity="error">
            <Paragraph>Be Warned</Paragraph>
            <h2>
              You cannot change the game right now. Will be available once run
              ends.
            </h2>
          </Alert>
        )}
      </Stack>
    </DashboardThemeProvider>
  );
};

render(<NextRun />);

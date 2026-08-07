import { Alert, Button, Stack, styled } from "@mui/material";
import { useReplicant } from "@nodecg/react-hooks";
import { useMemo } from "react";
import { type RunData } from "speedcontrol/src/types";
import { type Timer } from "speedcontrol/src/types/schemas";
import useCurrentObsScene from "../hooks/useCurrentObsScene";
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
  const nextRun = useNextRun();

  const [timer] = useReplicant<Timer | undefined>("timer", {
    bundle: "nodecg-speedcontrol",
  });
  const [_, setWorld] = useReplicant<string>("currentWorld", {
    defaultValue: "1",
  });

  const nextRunGameName = useMemo(() => getNextRunGameName(nextRun), [nextRun]);

  const disableChange =
    (timer && ["running", "paused"].includes(timer.state)) ??
    currentObsScene === intermissionSceneName;

  return (
    <DashboardThemeProvider>
      <Stack spacing={2}>
        <Button
          variant="contained"
          fullWidth
          disabled={disableChange ?? !nextRun}
          onClick={() => {
            console.log(`Next Game: ${nextRunGameName}`);
            if ((nextRun?.customData.layout ?? "1").includes("Cutscene")) {
              void nodecg.sendMessage(
                "switchToNextWorld",
                nextRun?.customData.layout,
              );
              setWorld(nextRun?.customData.world ?? "1");
            } else if (nextRun) {
              void nodecg.sendMessage("switchToIntermissionWithAnimation");
            }
          }}
        >
          <span>Switch to Intermission</span>
        </Button>
        <Button
          variant="contained"
          fullWidth
          disabled={disableChange ?? !nextRun}
          onClick={() => {
            void nodecg.sendMessage("switchToGame");
          }}
        >
          <span>Switch to Game</span>
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

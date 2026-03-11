import { Alert, Button, Stack, styled } from "@mui/material";
import { useReplicant } from "@nodecg/react-hooks";
import { type RunData } from "bundles/nodecg-speedcontrol/src/types";
import { useMemo } from "react";
import { type Timer } from "../../../bundles/nodecg-speedcontrol/src/types/schemas/timer";
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
            if (nextRun) {
              nodecg.sendMessage("switchToIntermission").catch(() => {
                /* empty */
              });
            }
          }}
        >
          <span>
            {nextRun ? (nextRunGameName ?? "No next runs") : "No added runs"}
          </span>
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

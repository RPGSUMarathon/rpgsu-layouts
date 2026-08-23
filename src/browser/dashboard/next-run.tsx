import { Alert, Button, Stack, styled } from "@mui/material";
import { useReplicant } from "@nodecg/react-hooks";
import { type Timer } from "speedcontrol/src/types/schemas";
import useCurrentObsScene from "../hooks/useCurrentObsScene";
import useCurrentRun from "../hooks/useCurrentRun";
import useNextRun from "../hooks/useNextRun";
import { render } from "../render";
import { DashboardThemeProvider } from "./components/DashboardThemeProvider";

const intermissionSceneName = nodecg.bundleConfig.obs.scenes?.intermission;
const cutsceneSceneName = nodecg.bundleConfig.obs.scenes?.cutscene;
const gameSceneName = nodecg.bundleConfig.obs.scenes?.game;

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

  const currentRunIsCutscene =
    (currentRun?.customData?.layout ?? "").includes("Cutscene") ?? false;

  const disableChange =
    (timer && ["running", "paused"].includes(timer.state)) ??
    currentObsScene === intermissionSceneName;

  return (
    <DashboardThemeProvider>
      <Stack spacing={2}>
        <h2>Current Scene: {currentObsScene}</h2>
        <details>
          <summary>
            <i>Explanation</i>
          </summary>
          <p>
            All the transition buttons are deactivated when the timer is
            ongoing.
          </p>
          <p>
            To Intermission is deactivated when in the intermission screen and
            To Game is deactivated when in the game screen
          </p>
          <p>
            When the next run is a cutscene, only the cutscene button is
            activated. This changes to the correct cutscene automatically. Once
            in that scene, all the other buttons become active again.
          </p>
          <p>Emergency transition to Tech Issues is active at all times.</p>
        </details>
        <Button
          variant="contained"
          fullWidth
          disabled={
            disableChange ||
            (currentRunIsCutscene &&
              !currentObsScene.includes(cutsceneSceneName ?? "")) ||
            currentObsScene === intermissionSceneName ||
            !nextRun
          }
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
          disabled={
            currentObsScene === gameSceneName ||
            (currentRunIsCutscene &&
              !currentObsScene.includes(cutsceneSceneName ?? ""))
          }
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
              currentObsScene.includes(cutsceneSceneName ?? "")) ??
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

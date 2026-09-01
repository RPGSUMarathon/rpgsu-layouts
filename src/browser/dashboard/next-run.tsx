import {
  Alert,
  Button,
  IconButton,
  Stack,
  styled,
  Tooltip,
} from "@mui/material";
import { useReplicant } from "@nodecg/react-hooks";
import { useState } from "react";
import { type Timer } from "speedcontrol/src/types/schemas";
import { Helpers } from "../helpers";
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
  const [forceEnableAll, setForceEnableAll] = useState(false);
  const [timer] = useReplicant<Timer | undefined>("timer", {
    bundle: "nodecg-speedcontrol",
  });
  const [currentWorld, setWorld] = useReplicant<string>("currentWorld", {
    defaultValue: "1",
  });
  const [timestamps, setTimestamps] = useReplicant<Timestamp[]>("timestamps", {
    defaultValue: [],
  });

  const isTimerActive = timer?.state === "running" || timer?.state === "paused";

  const isIntermissionScene = currentObsScene === intermissionSceneName;

  const isGameScene = currentObsScene === gameSceneName;

  const isCutsceneScene =
    currentObsScene?.includes(cutsceneSceneName ?? "") ?? false;

  const currentRunIsCutscene = (currentRun?.customData?.layout ?? "").includes(
    "Cutscene",
  );

  const cutsceneTransitionPending = currentRunIsCutscene && !isCutsceneScene;

  const buttonDisabled = {
    intermission:
      !forceEnableAll &&
      (isTimerActive || isIntermissionScene || cutsceneTransitionPending),

    game: !forceEnableAll && (isGameScene || cutsceneTransitionPending),

    cutscene: !forceEnableAll && (!currentRunIsCutscene || isCutsceneScene),

    techIssues: false,
  };

  const onAddStartTimestamp = (id: string, name: string, start: number) => {
    const current = timestamps ?? [];
    const previous = current[current.length - 1];

    const timestamp: Timestamp = {
      id,
      name,
      start,
      end: null,
      setup: previous?.end != null ? start - previous.end : null,
    };

    console.log(timestamp);

    setTimestamps([...current, timestamp]);
  };

  const onAddEndTimestamp = (id: string, end: number) => {
    const newTimestamps = (timestamps ?? []).map((timestamp) =>
      timestamp.id === id
        ? {
            ...timestamp,
            end,
          }
        : timestamp,
    );

    setTimestamps(newTimestamps);
  };

  return (
    <DashboardThemeProvider>
      <Stack spacing={2}>
        <h2>Current Scene: {currentObsScene}</h2>
        <Stack direction="row" justifyContent="flex-end">
          <Tooltip
            title={
              forceEnableAll
                ? "Disable force enable"
                : "Force enable all buttons"
            }
          >
            <IconButton
              size="small"
              color={forceEnableAll ? "warning" : "default"}
              onClick={() => setForceEnableAll((enabled) => !enabled)}
              aria-label={
                forceEnableAll
                  ? "Disable force enable"
                  : "Force enable all buttons"
              }
            >
              {forceEnableAll ? <span>Lock</span> : <span>Unlock</span>}
            </IconButton>
          </Tooltip>
        </Stack>
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
          disabled={buttonDisabled.intermission}
          onClick={() => {
            if (nextRun) {
              onAddEndTimestamp(currentRun?.id ?? "", Date.now());
              void nodecg.sendMessage("switchToIntermissionWithAnimation");
            }
          }}
        >
          <span>Transition to Intermission</span>
        </Button>
        <Button
          variant="contained"
          fullWidth
          disabled={buttonDisabled.game}
          onClick={() => {
            if (currentRun) {
              onAddStartTimestamp(
                currentRun.id ?? "",
                currentRun.game ?? "",
                Date.now(),
              );
              const runnerName = Helpers.formatPlayers(currentRun);
              void nodecg.sendMessage(
                "switchToGame",
                `${currentRun?.game} by ${runnerName}`,
              );
            }
          }}
        >
          <span>Transition to Game</span>
        </Button>
        <Button
          variant="contained"
          fullWidth
          disabled={buttonDisabled.cutscene}
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
          disabled={buttonDisabled.techIssues}
          onClick={() => {
            console.log(timestamps);
            void nodecg.sendMessage("switchToTechIssues");
          }}
        >
          <span>Transition to Tech Issues</span>
        </Button>
        {isTimerActive && (
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

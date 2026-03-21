import { Button, Grid, TextField } from "@mui/material";
import { useReplicant } from "@nodecg/react-hooks";
import { useEffect, useState } from "react";
import {
  type CountdownRunning,
  type Countdown as CountdownType,
} from "../../types/generated";
import { render } from "../render";
import { DashboardThemeProvider } from "./components/DashboardThemeProvider";

export const Countdown = () => {
  const [countdown] = useReplicant<CountdownType>("countdown");
  const [countdownRunning] = useReplicant<CountdownRunning>("countdownRunning");
  const [countdownText, setCountdownText] = useState("10:00");

  useEffect(() => {
    if (typeof countdown === "undefined") return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCountdownText(countdown.formatted);
  }, [countdown]);

  return (
    <DashboardThemeProvider>
      <TextField
        label="Countdown time"
        variant="outlined"
        disabled={countdownRunning}
        value={countdownText}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setCountdownText(event.target.value);
        }}
        style={{ marginBottom: "15px" }}
        fullWidth
      />
      <Grid container spacing={3}>
        <Grid size={6}>
          <Button
            variant="contained"
            onClick={() => {
              nodecg.sendMessage("startCountdown", countdownText).catch(() => {
                /* empty */
              });
            }}
            disabled={countdownRunning}
          >
            Start countdown
          </Button>
        </Grid>
        <Grid size={6}>
          <Button
            variant="contained"
            onClick={() => {
              nodecg.sendMessage("stopCountdown").catch(() => {
                /* empty */
              });
            }}
            disabled={!countdownRunning}
          >
            Stop countdown
          </Button>
        </Grid>
      </Grid>
    </DashboardThemeProvider>
  );
};

render(<Countdown />);

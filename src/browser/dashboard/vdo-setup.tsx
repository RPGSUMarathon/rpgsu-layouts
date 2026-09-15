import {
  Button,
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { useReplicant } from "@nodecg/react-hooks/use-replicant";
import { type Commentator } from "@rpgsu-layouts/types/custom/commentators";
import { type VdoConfig } from "@rpgsu-layouts/types/custom/vdo-config";
import { useState } from "react";
import useCurrentRun from "../hooks/useCurrentRun";
import { render } from "../render";
import { DashboardThemeProvider } from "./components/DashboardThemeProvider";

export const VDOSetup = () => {
  const currentRun = useCurrentRun();
  const player = currentRun?.teams[0]?.players[0];
  const [commentators] = useReplicant<Commentator[]>("commentators", {
    defaultValue: [],
  });

  const [vdoConfig, setVDOConfig] = useReplicant<VdoConfig>("vdoConfig", {
    defaultValue: {
      enabled: false,
      room: "RPGSU",
      password: "RPGSU",
    },
  });

  const [vdoEnabled, setVDOEnabled] = useState(false);
  const [room, setRoom] = useState("");
  const [password, setPassword] = useState("");

  const saveVDOConfig = () => {
    setVDOConfig({
      enabled: vdoEnabled,
      room: room,
      password: password,
    });
  };

  return (
    <DashboardThemeProvider>
      <Stack spacing={2}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setVDOEnabled(event.target.checked);
                  setVDOConfig({
                    enabled: event.target.checked,
                    room: vdoConfig?.room ?? "",
                    password: vdoConfig?.password ?? "",
                  });
                }}
              />
            }
            label="Enable VDO.Ninja Connection"
          />
        </FormGroup>
        <Stack direction="row" spacing={2}>
          <h2>Runner: {player?.name}</h2>
          <TextField
            id="outlined-basic"
            label="Runner's ID"
            variant="outlined"
            value={room}
            placeholder="RunnerID"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setRoom(event.target.value);
            }}
          />
        </Stack>
        {commentators &&
          commentators.map((commentator) => (
            <Stack key={commentator.id} direction="row" spacing={2}>
              <h2>Commentator: {commentator.name}</h2>
              <TextField
                id="outlined-basic"
                label="Commentator's ID"
                variant="outlined"
                value={room}
                placeholder="CommentatorID"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setRoom(event.target.value);
                }}
              />
            </Stack>
          ))}
        <details>
          <summary>Advanced Settings</summary>
          <Stack spacing={2}>
            <TextField
              id="outlined-basic"
              label="VDO.Ninja Room"
              variant="outlined"
              value={room}
              placeholder="Url"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setRoom(event.target.value);
              }}
            />
            <TextField
              id="outlined-basic"
              label="VDO.Ninja Password"
              variant="outlined"
              value={password}
              placeholder="Password"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(event.target.value);
              }}
            />
            <Button variant="contained" fullWidth onClick={saveVDOConfig}>
              Save Configuration
            </Button>
          </Stack>
        </details>
      </Stack>
    </DashboardThemeProvider>
  );
};

render(<VDOSetup />);

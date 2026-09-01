import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { render } from "../render";
import { DashboardThemeProvider } from "./components/DashboardThemeProvider";

export const TestComponent = () => {
  const [command, setCommand] = useState("");

  return (
    <DashboardThemeProvider>
      <Stack spacing={2}>
        <span className="italic">
          Commands written here are sent directly to the backend. Warning: High
          risk of crashing layouts.
        </span>
        <Stack spacing={2} direction="row">
          <TextField
            id="standard-basic"
            label="Standard"
            variant="standard"
            value={command}
            onChange={(event) => {
              setCommand(event.target.value);
            }}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              void nodecg.sendMessage(command);
              setCommand("");
            }}
          >
            Send
          </Button>
        </Stack>
      </Stack>
    </DashboardThemeProvider>
  );
};

render(<TestComponent />);

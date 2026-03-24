import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { useReplicant } from "@nodecg/react-hooks";
import { render } from "../render";
import { DashboardThemeProvider } from "./components/DashboardThemeProvider";

const BackgroundToggle = () => {
  const [backgroundToggleOn, setBackgroundToggle] = useReplicant<boolean>(
    "backgroundToggleOn",
    {
      defaultValue: false,
    },
  );
  const [iconToggleOn, setIconToggle] = useReplicant<boolean>("iconToggleOn", {
    defaultValue: false,
  });

  return (
    <DashboardThemeProvider>
      <div className="inline-flex items-center justify-between">
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={backgroundToggleOn ?? false}
                onChange={(e) => {
                  setBackgroundToggle(e.target.checked);
                }}
              />
            }
            label="Toggle transparency on the background in the game scenes."
          />
          <FormControlLabel
            control={
              <Switch
                checked={iconToggleOn ?? false}
                onChange={(e) => {
                  setIconToggle(e.target.checked);
                }}
              />
            }
            label="Toggle icons in the runner/commentators box."
          />
        </FormGroup>
      </div>
    </DashboardThemeProvider>
  );
};

render(<BackgroundToggle />);

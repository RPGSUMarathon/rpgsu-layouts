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
        </FormGroup>
      </div>
    </DashboardThemeProvider>
  );
};

render(<BackgroundToggle />);

import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { useReplicant } from "@nodecg/react-hooks";
import { render } from "../render";
import { DashboardThemeProvider } from "./components/DashboardThemeProvider";

const FlashingLightsWarning = () => {
  const [flashWarningOn, setFlashWarningOn] = useReplicant<boolean>(
    "flashWarningOn",
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
                checked={flashWarningOn ?? false}
                onChange={(e) => {
                  setFlashWarningOn(e.target.checked);
                }}
              />
            }
            label="Turn on flashing lights warning"
          />
        </FormGroup>
      </div>
    </DashboardThemeProvider>
  );
};

render(<FlashingLightsWarning />);

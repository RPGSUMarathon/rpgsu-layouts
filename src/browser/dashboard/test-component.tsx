import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { render } from "../render";
import { DashboardThemeProvider } from "./components/DashboardThemeProvider";

export const TestComponent = () => {
  return (
    <DashboardThemeProvider>
      <Stack spacing={2}>
        <Button
          variant="contained"
          fullWidth
          onClick={() => {
            void nodecg.sendMessage("notifyDonation");
          }}
        >
          <span>Test Donation Notification</span>
        </Button>
      </Stack>
    </DashboardThemeProvider>
  );
};

render(<TestComponent />);

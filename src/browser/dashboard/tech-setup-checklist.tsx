import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useState } from "react";
import useCurrentRun from "../hooks/useCurrentRun";
import { render } from "../render";
import { DashboardThemeProvider } from "./components/DashboardThemeProvider";

const Checklist = () => {
  // const onlineChecklist = [
  //   "Run a 3 minute ad",
  //   "*Coming Up* run matches with run being set up",
  //   "Move runners and commentators to the LIVE channel",
  //   "Add commentators names, twitch/social media accounts and pronouns, if relevant",
  //   "Check that the runner is live",
  //   "Check cropping",
  //   "Balance audio",
  //   "Update Twitch commands",
  //   "Transition to the run",
  // ];

  const offlineChecklist = [
    "Welcome runner and setup console/PC game",
    "Distribute the headsets",
    "Coming Up run matches with run being set up.",
    "Add commentators names, twitch/social media accounts and pronouns.",
    "Check cropping",
    "Balance audio",
    "Update Twitch commands",
    "Transition to the run",
  ];

  const [checkedItems, setCheckedItems] = useState(
    offlineChecklist.map(() => false),
  );

  const toggleItem = (index: number) => {
    setCheckedItems((prev) =>
      prev.map((item, i) => (i === index ? !item : item)),
    );
  };

  return (
    <DashboardThemeProvider>
      <FormGroup>
        {offlineChecklist.map((item, index) => (
          <FormControlLabel
            key={item}
            control={<Checkbox checked={checkedItems[index]} />}
            onChange={() => toggleItem(index)}
            label={item}
          />
        ))}
      </FormGroup>
    </DashboardThemeProvider>
  );
};

const TechSetupChecklist = () => {
  const currentRun = useCurrentRun();

  return <Checklist key={currentRun?.id ?? "no-run"} />;
};

render(<TechSetupChecklist />);

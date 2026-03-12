import { useState } from "react";
import useCurrentRun from "../hooks/useCurrentRun";
import { render } from "../render";
import { DashboardThemeProvider } from "./components/DashboardThemeProvider";

const Checklist = () => {
  const checklist = [
    "Run a 3 minute ad",
    "*Coming Up* run matches with run being set up",
    "Move runners and commentators to the LIVE channel",
    "Add commentators names, twitch/social media accounts and pronouns, if relevant",
    "Check that the runner is live",
    "Check cropping",
    "Balance audio",
    "Update Twitch commands",
    "Transition to the run",
  ];

  const [checkedItems, setCheckedItems] = useState(checklist.map(() => false));

  const toggleItem = (index: number) => {
    setCheckedItems((prev) =>
      prev.map((item, i) => (i === index ? !item : item)),
    );
  };

  return (
    <DashboardThemeProvider>
      {checklist.map((item, index) => (
        <li key={item} className="w-full list-none">
          <div className="flex items-center ps-3">
            <input
              type="checkbox"
              checked={checkedItems[index]}
              onChange={() => toggleItem(index)}
              className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
            />
            <label className="w-full ms-1 text-sm font-medium text-heading">
              {item}
            </label>
          </div>
        </li>
      ))}
    </DashboardThemeProvider>
  );
};

const TechSetupChecklist = () => {
  const currentRun = useCurrentRun();

  return <Checklist key={currentRun?.id ?? "no-run"} />;
};

render(<TechSetupChecklist />);

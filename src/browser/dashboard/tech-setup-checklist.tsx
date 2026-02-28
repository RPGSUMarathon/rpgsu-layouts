import { render } from "../render";
import { DashboardThemeProvider } from "./components/DashboardThemeProvider";

export const TechSetupChecklist = () => {
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

  return (
    <DashboardThemeProvider>
      {checklist.map((item) => (
        <li key={item} className="w-full list-none">
          <div className="flex items-center ps-3">
            <input
              id="vue-checkbox"
              type="checkbox"
              value=""
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

render(<TechSetupChecklist />);

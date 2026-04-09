import { render } from "../../render";
import {
  OmnibarDateTime,
  OmnibarLogo,
  OmnibarTicker,
} from "../components/Omnibar";
import { ThemeProvider } from "../components/theme-provider";

export const Omnibar = () => {
  return (
    <ThemeProvider>
      <div className="w-full h-[60px] bg-offline-omnibar box2 flex flex-row justify-between px-4">
        <OmnibarLogo className="flex-none" />
        <OmnibarTicker className="flex-1 px-2" />
        <OmnibarDateTime className="mt-1.5" />
      </div>
    </ThemeProvider>
  );
};

render(<Omnibar />);

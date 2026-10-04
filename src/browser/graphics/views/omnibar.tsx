import { render } from "../../render";
import {
  OmnibarDateTime,
  OmnibarDonationTotal,
  OmnibarLogo,
  OmnibarTicker,
} from "../components/Omnibar";
import { ThemeProvider } from "../components/theme-provider";

export const Omnibar = () => {
  return (
    <ThemeProvider theme="offline">
      <div className="w-full h-[60px] bg-offline-omnibar theme-border-t theme-border-box flex flex-row justify-between px-4">
        <OmnibarLogo className="flex-none theme-border-r" />
        <OmnibarDonationTotal className="flex-none theme-border-r" />
        <OmnibarTicker className="flex-1 px-2 theme-border-r" />
        <OmnibarDateTime className="mt-1.5 px-1" />
      </div>
    </ThemeProvider>
  );
};

render(<Omnibar />);

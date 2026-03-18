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
      <div
        className="w-full h-[60px] bg-[#278178] border-t-2 border-white flex flex-row justify-between px-4"
        style={{ boxShadow: "0px -2px 2px rgba(0,0,0,0.1)" }}
      >
        <OmnibarLogo className="flex-none" />
        <OmnibarTicker className="flex-1 px-2" />
        <OmnibarDateTime className="mt-1.5" />
      </div>
    </ThemeProvider>
  );
};

render(<Omnibar />);

import { render } from "../../render";
import { ThemeProvider } from "../components/theme-provider";

export const Rerun = () => {
  return (
    <ThemeProvider theme="offline" className="w-full h-full">
      <div className="rerun-div bg-(--color-offline-main) text-center rounded-xl shadow shadow-md shadow-black w-[1160px] h-[50px]">
        <h1 className="text-2xl engraved font-semibold">
          This is a rerun. Live runs at RPGSU Offline 2026 will be back in the
          morning.
        </h1>
      </div>
    </ThemeProvider>
  );
};

render(<Rerun />);

import { useReplicant } from "@nodecg/react-hooks";
import { type Countdown } from "@rpgsu-layouts/types";
import { render } from "../../render";
import { ThemeProvider } from "../components/theme-provider";
import Logo from "../img/offline2026/offline26_logo.png";
import Background from "../img/offline2026/offline-background.png";

export const CountdownView = () => {
  const [countdown] = useReplicant<Countdown>("countdown");

  return (
    <ThemeProvider theme="offline" style={{ background: `url(${Background})` }}>
      <div className="w-full flex flex-col text-center align-center gap-10">
        <div className="w-full text-center flex flex-row align-center justify-center">
          <img className="w-1/2" src={Logo} />
        </div>
        <div>
          <div className="text-5xl font-semibold text-shadow-md text-shadow-black">
            Stream starting in:{" "}
          </div>
          <div className="text-9xl font-bold text-shadow-md text-shadow-black">
            {countdown?.formatted}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

render(<CountdownView />);

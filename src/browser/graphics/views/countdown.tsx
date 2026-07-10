import { useReplicant } from "@nodecg/react-hooks";
import { type Countdown } from "@rpgsu-layouts/types";
import { render } from "../../render";
import { ThemeProvider } from "../components/theme-provider";
import Background from "../img/offline2026/offline-background.png";
import Logo from "../img/online2026/base-online-logo.png";

export const CountdownView = () => {
  const [countdown] = useReplicant<Countdown>("countdown");

  return (
    <ThemeProvider theme="offline" style={{ background: `url(${Background})` }}>
      <div className="w-full flex flex-col text-center align-center gap-10">
        <div className="w-full text-center flex flex-row align-center justify-center">
          <img className="w-1/3" src={Logo} />
        </div>
        <div>
          <div className="text-5xl font-semibold">Stream starting in: </div>
          <div className="text-9xl font-bold">{countdown?.formatted}</div>
        </div>
      </div>
    </ThemeProvider>
  );
};

render(<CountdownView />);

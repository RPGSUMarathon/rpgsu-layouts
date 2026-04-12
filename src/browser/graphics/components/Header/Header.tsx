import Bluesky from "../../img/icons/bluesky.png";
import Youtube from "../../img/icons/youtube.png";
import OnlineLongLogo from "../../img/online2026/base-long-online-logo.png";
import { Category, Estimate, Game, Timer } from "../RunTexts";

export const Header = () => {
  return (
    <div className="w-full h-32.5 theme-border-b flex flex-row bg-linear-to-b bg-(--color-world-dark)">
      <div className="flex-none w-183.75 h-32.5 theme-border-r">
        <div className="h-1/2 theme-border-b theme-border-box">
          <Game />
        </div>
        <div className="h-1/2 flex flex-row items-center">
          <span
            className={`h-full w-114.25  theme-border-r theme-border-box text-white `}
          >
            <Category />
          </span>
          <span className="h-full w-71.25 theme-border-box">
            <Estimate />
          </span>
        </div>
      </div>
      <div className="h-full w-112.5 theme-border-r theme-border-box ">
        <Timer className="font-bold drop-shadow" />
      </div>
      <div className="theme-border-box flex flex-row flex-1">
        <div className="flex max-w-95 pl-15 p-1">
          <img src={OnlineLongLogo} alt="OnlineLongLogo" />
        </div>
        <div className="flex-1 text-2xl font-bold p-1 ">
          <div className="flex items-center gap-5">
            <span>Follow us on Social Media!</span>
          </div>
          <div className="flex items-center gap-5">
            <img className="h-10" src={Youtube} alt="Youtube Logo" />
            <span>@rpgsumarathon</span>
          </div>
          <div className="flex items-center gap-5">
            <img className="h-10" src={Bluesky} alt="Bluesky Logo" />
            <span>@rpgsu</span>
          </div>
        </div>
      </div>
    </div>
  );
};

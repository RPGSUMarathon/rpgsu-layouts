import OnlineLongLogo from "../../img/base-long-online-logo.png";
import Bluesky from "../../img/icons/bluesky.png";
import Youtube from "../../img/icons/youtube.png";
import { Category, Estimate, Game, Timer } from "../RunTexts";

export const Header = () => {
  return (
    <div className="w-full h-32.5 border-b-5 border-white flex flex-row bg-linear-to-b from-teal-800 to-teal-700">
      <div className="flex-none w-183.75 h-32.5 border-r-5 border-white">
        <div className="h-1/2 border-b-2 border-white ">
          <Game />
        </div>
        <div className="h-1/2 flex flex-row items-center">
          <span
            className={`h-full min-w-1/2 border-r-5 border-white text-white `}
          >
            <Category />
          </span>
          <span className="h-full  border-white min-w-1/2">
            <Estimate />
          </span>
        </div>
      </div>
      <div className="h-full w-112.5 border-r-5 border-white ">
        <Timer className="font-bold drop-shadow" />
      </div>
      <div className="flex max-w-95 pl-15">
        <img src={OnlineLongLogo} alt="OnlineLongLogo" />
      </div>
      <div className="flex-1 text-2xl font-bold">
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
  );
};

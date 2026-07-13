import Bluesky from "../../img/icons/bluesky.png";
import Youtube from "../../img/icons/youtube.png";
import Logo from "../../img/offline2026/offline26_logo.png";

export const HeaderInfoContainer = () => {
  return (
    <div className="flex w-full h-full justify-around top-0 absolute -z-1">
      <div className="">
        <img src={Logo} width={220} alt="RPGSU Event Logo" />
      </div>
      <div className="text-2xl font-bold p-1 ">
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

import Bluesky from "../../../img/icons/bluesky-color.png";
import Youtube from "../../../img/icons/youtube-color.png";

export const SocialMediaContainer = () => {
  return (
    <div className="flex flex-col w-full h-full justify-around text-4xl gap-4 text-black items-center">
      <div className="flex items-center gap-5">
        <span>Follow us on Social Media!</span>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-5">
          <img className="h-10" src={Youtube} alt="Youtube Logo" />
          <span>rpgsumarathon</span>
        </div>
        <div className="flex items-center gap-5">
          <img className="h-10" src={Bluesky} alt="Bluesky Logo" />
          <span>rpgsu</span>
        </div>
      </div>
    </div>
  );
};

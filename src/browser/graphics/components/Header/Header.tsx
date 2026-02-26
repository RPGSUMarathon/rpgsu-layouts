import {Timer, Game, Estimate, Category} from '../RunTexts';
import {useGameTextSize, useCategoryTextSize} from '../../../hooks/useLayoutTextSize';
import Twitch from "../../img/icons/twitch.png";
import Youtube from "../../img/icons/youtube.png";
import Bluesky from "../../img/icons/bluesky.png";
import Logo from "../../img/text-banner.png";
import OnlineLongLogo from "../../img/base-long-online-logo.png";

export const Header = () => {
  const gameTextSize = useGameTextSize();
  const categoryTextSize = useCategoryTextSize();

    return (
        <div className='w-full h-[130px] border-b-10 border-white flex flex-row bg-gradient-to-b from-teal-800 to-teal-700'>
            <div className='flex-none w-[735px] h-[130px] border-r-5 border-white'>
                <div className='h-1/2 border-b-2 border-white p-2'>
                    <span className={`mt-1 drop-shadow text-white font-medium break-words wrap-normal ${gameTextSize ? `text-${gameTextSize}` : "text-3xl"}`}>
                        <Game />
                    </span>
                </div>
                <div className='h-1/2 flex flex-row items-center'>
                    <span className={`h-full min-w-1/2 p-3 border-r-5 border-white text-white font-medium break-words wrap-normal ${categoryTextSize ? `text-${categoryTextSize}` : "text-3xl"}`}>
                        <Category />
                    </span>
                    <span className="h-full p-3 border-white mx-auto text-3xl break-words wrap-normal">
                        <Estimate />
                    </span>
                </div>
            </div>
            <div className='flex-none h-full w-[450px] border-r-5 border-white place-self-center'>
                <Timer className='text-8xl drop-shadow' />
            </div>
            <div className='flex max-w-[380px] pl-[60px]'>
                <img src={OnlineLongLogo} alt="OnlineLongLogo" />
            </div>
            <div className='flex-1 text-2xl font-bold'>
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
        <div className="h-1/2 flex flex-row items-center">
          <span
            className={`h-full min-w-1/2 p-3 border-r-5 border-white text-white font-medium break-words wrap-normal ${categoryTextSize ? `text-${categoryTextSize}` : "text-3xl"}`}
          >
            <Category />
          </span>
          <span className="h-full p-3 border-white mx-auto text-3xl break-words wrap-normal">
            <Estimate />
          </span>
        </div>
      </div>
      <div className="w-[400px] border-r-5 border-white flex items-center justify-center text-center">
        <Timer className="text-7xl drop-shadow" />
      </div>
    </div>
  );
};

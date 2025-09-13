import Logo from "../img/logo-text.png";
import Twitch from "../img/icons/twitch.png";
import Youtube from "../img/icons/youtube.png";
import Bluesky from "../img/icons/bluesky.png";


export const IntermissionLogoSocialMedia = ({ className = '' }: { className?: string }) => {
    return (<div className={`text-center flex flex-col mx-auto my-10 ${className}`}>
        <img src={Logo} alt="Logo" className="w-10/12 mx-auto" />
        <div>
            <h2 className="drop-shadow-2xl text-4xl">A home for RPG Speedruns.</h2>
            <h3 className="drop-shadow-2xl text-3xl">Follow us here:</h3>
            <div className="grid grid-flow-col ">
                <div className="inline-flex items-center gap-2 text-2xl">
                    <img src={Twitch} alt="Twitch Logo" />
                    <span>@rpgsu</span>
                </div>
                <div className="inline-flex ml-10 items-center gap-2 text-2xl">
                    <img src={Youtube} alt="Youtube Logo" />
                    <span>@rpgsumarathon</span>
                </div>
                <div className="inline-flex items-center ml-10 gap-2 text-2xl">
                    <img src={Bluesky} alt="Bluesky Logo" />
                    <span>@rpgsu</span>
                </div>
            </div>
        </div>

    </div>);
}
import Logo from "../img/logo-text.png";
import Twitch from "../img/svgs/twitch.svg";
import Youtube from "../img/svgs/youtube.svg";
import Bluesky from "../img/svgs/bluesky.svg";


export const IntermissionLogoSocialMedia = () => {
    return (<div className="text-center flex flex-col mx-auto">
        <img src={Logo} alt="Logo" className="w-8/12" />
        <h2 className="drop-shadow-2xl text-3xl">A home for RPG Speedruns.</h2>
        <h3 className="drop-shadow-2xl text-2xl">Follow us here:</h3>
        <div className="grid grid-flow-col">
            <div>
                <img src={Twitch} alt="Twitch Logo" />
                <span>@rpgsu</span>
            </div>
            <div>
                <img src={Youtube} alt="Youtube Logo" />
                <span>@rpgsumarathon</span>
            </div>
            <div>
                <img src={Bluesky} alt="Bluesky Logo" />                
                <span>@rpgsu</span>
            </div>
        </div>
    </div>);
}
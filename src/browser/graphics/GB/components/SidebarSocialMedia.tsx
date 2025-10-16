import Twitch from "../../img/icons/twitch.png";
import Youtube from "../../img/icons/youtube.png";
import Bluesky from "../../img/icons/bluesky.png";
import Logo from "../../img/logo-text.png";


type Props = {
    className?: string,
}


export const SidebarSocialMedia = ({ className }: Props) => {
    return (<div className={`text-center flex flex-row mx-auto my-10 items-center  ${className}`}>
        <img src={Logo} alt="Logo" className="w-[250px] ml-15 mr-15" />
        <div className="grid grid-flow-row">
            <div className="inline-flex items-center gap-5 text-4xl">
                <img src={Twitch} alt="Twitch Logo" />
                <span>@rpgsu</span>
            </div>
            <div className="inline-flex items-center gap-5 text-4xl">
                <img src={Youtube} alt="Youtube Logo" />
                <span>@rpgsumarathon</span>
            </div>
            <div className="inline-flex items-center gap-5 text-4xl">
                <img src={Bluesky} alt="Bluesky Logo" />
                <span>@rpgsu</span>
            </div>
        </div>

    </div>);
}
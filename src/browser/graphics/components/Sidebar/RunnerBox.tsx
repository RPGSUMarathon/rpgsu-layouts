import Mic from "../../img/icons/mic.png";
import Runner from "../../img/icons/runner.png";

type Props = {
    pronouns?: string,
    name: string,
    className?: string,
    runner: boolean,
    textSize?: string
}

export const RunnerBox = ({pronouns, name, runner, className, textSize} : Props) => {
    return (
        <div className={`w-full h-[50px] border-b-3 border-white bg-[#278178] relative flex flex-row items-center ${className ?? ''}`}>
            {pronouns && <div className="absolute bottom-0 right-0 bg-[#000000]/70 text-white text-xs px-2 py-0.5">
                {pronouns}
            </div>}
            <img src={runner? Runner : Mic} className="ml-3 h-5/6" alt="Twitch Logo" />
            <span className={`p-3 text-white drop-shadow break-words wrap-normal ${textSize ? `text-${textSize}` : "text-2xl"}`}>{name}</span>
        </div>
    );
}
import Mic from "../../img/icons/mic.png";
import Runner from "../../img/icons/runner.png";
import Twitch from "../../img/icons/twitch.png";
import Youtube from "../../img/icons/youtube.png";

type Props = {
    pronouns?: string,
    name: string,
    className?: string,
    runner: boolean,
    textSize?: string,
    twitch?: string,
    youtube?: string
}

export const RunnerBox = ({ pronouns, name, runner, className, textSize, twitch, youtube }: Props) => {
    return (
        <div className={`w-full h-[50px] border-b-3 border-white bg-[#278178] relative flex flex-row items-center ${className ?? ''}`}>
            {pronouns && <div className="absolute capitalize bottom-0 right-0 bg-[#000000]/70 text-white text-xs px-2 py-0.5">
                {pronouns}
            </div>}
            <img src={runner ? Runner : Mic} className="ml-3 h-5/6" alt="Twitch Logo" />
            {twitch || youtube ? <div>
                <span className={`absolute top-[5px] ml-5 text-fade1-two text-white drop-shadow break-words wrap-normal ${textSize ? `text-${textSize}` : "text-2xl"}`}>{name}</span>
                <div className="absolute top-[5px] inline-flex ml-5 gap-2 text-2xl text-fade2-two opacity-0">
                    <img className="max-w-[20%]" src={Twitch} alt="Twitch Logo" />
                    <span>{twitch}</span>
                </div>

            </div> :
                <span className={`p-3 text-white drop-shadow break-words wrap-normal ${textSize ? `text-${textSize}` : "text-2xl"}`}>{name}</span>}
        </div>
    );
}
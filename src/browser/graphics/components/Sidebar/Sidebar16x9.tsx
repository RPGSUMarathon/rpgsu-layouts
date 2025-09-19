import { RunnerBox } from './RunnerBox';
import Twitch from "../../img/icons/twitch-color.png";
import Youtube from "../../img/icons/youtube-color.png";
import Bluesky from "../../img/icons/bluesky-color.png";
import Logo from "../../img/logo-text.png";
import {useRunnerTextSize} from '../../../hooks/useLayoutTextSize';
import useCurrentRun from '../../../hooks/useCurrentRun';
import useCommentators from '../../../hooks/useCommentators';
import useCameraOn from '../../../hooks/useCameraOn';


type Props = {
    widthLength : string;
}


export const Sidebar16x9 = ({widthLength} : Props) => {
    const currentRun = useCurrentRun();
    const cameraOn = useCameraOn();
    const commentators = useCommentators();

    const player = currentRun?.teams[0]?.players[0];

    const runnerTextSize = useRunnerTextSize();
    const marginRatio = (commentators.length * -12) + 70;

    return (
        <div>
            <div className={`h-[965px] border-r-3 border-white"`} style={{width: `${widthLength}px`}}>
                {cameraOn && <div id="CameraBox" className="w-full h-[270px] border-b-3 border-white" />}
                <div className='bg-gradient-to-t from-teal-800 to-teal-600 h-full '>
                    <RunnerBox textSize={runnerTextSize} runner={true} pronouns={player?.pronouns} name={player?.name ?? ""} />
                    {commentators.length > 0 ? <div className='grid grid-cols-1'>
                        {commentators.map((runner) =>
                            <RunnerBox runner={false} className='border-r-3 border-white' pronouns={runner.pronouns} name={runner.name} />
                        )}
                    </div> : <></>}
                    <div className='flex flex-col items-center justify-center'>
                        <img src={Logo} alt="Logo" className={`w-1/2`} style={{marginTop: `calc(var(--spacing) * ${marginRatio})`}} />
                        <h2 className="drop-shadow-2xl text-2xl wrap-normal">A home for RPG Speedruns.</h2>
                    </div>
                </div>
            </div>
            <div className={`absolute left-[480px] bottom-0 w-[1440px] h-[155px] bg-[#278178] flex flex-row items-center justify-center gap-25 border-t-3 border-white`}>
                <div className="inline-flex items-center gap-5 text-4xl drop-shadow">
                    <img width={50} height={50} src={Twitch} alt="Twitch Logo" />
                    <span>@rpgsu</span>
                </div>
                <div className="inline-flex items-center gap-5 text-4xl">
                    <img width={50} height={50} src={Youtube} alt="Youtube Logo" />
                    <span>@rpgsumarathon</span>
                </div>
                <div className="inline-flex items-center gap-5 text-4xl">
                    <img width={50} height={50} src={Bluesky} alt="Bluesky Logo" />
                    <span>@rpgsu</span>
                </div>
            </div>
        </div>

    );
}
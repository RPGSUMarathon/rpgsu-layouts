import { ThemeProvider } from '../../components/theme-provider';
import { Header } from '../../components/Header/Header';
import { RunnerBox } from '../../components/RunTexts/RunnerBox';
import { useRunnerTextSize } from '../../../hooks/useLayoutTextSize';
import useCurrentRun from '../../../hooks/useCurrentRun';
import useCommentators from '../../../hooks/useCommentators';
import useCameraOn from '../../../hooks/useCameraOn';
import { useCommentatorColumnSize } from '../../../hooks/useLayoutTextSize';
import Waves from "../../img/waves.png";
import { NoCamera } from '../../components/NoCamera';
import Twitch from "../../img/icons/twitch.png";
import Youtube from "../../img/icons/youtube.png";
import Bluesky from "../../img/icons/bluesky.png";
import Logo from "../../img/text-banner.png";


type Props = {
    className?: string,
}


const SidebarSocialMedia = ({ className }: Props) => {
    return (<div className={`text-center flex flex-col mx-auto my-10 items-center  ${className}`}>
        <img src={Logo} alt="Logo" />
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


export const Sidebar4x3 = () => {
    const currentRun = useCurrentRun();
    const cameraOn = useCameraOn();
    const commentators = useCommentators();
    const commentatorsColumns = useCommentatorColumnSize();

    const player = currentRun?.teams[0]?.players[0];

    const runnerTextSize = useRunnerTextSize();

    return (
        <div className={`w-[600px] h-[980px] border-r-3 border-white"`}>
            {cameraOn && cameraOn ? <div id="CameraBox" className="w-full h-[337.5px] border-b-3 border-white" /> : <div className='h-[270px] border-b-3 border-white'><NoCamera /></div>}
            <div className='bg-[#278178] h-full' style={{
                    backgroundImage: `url(${Waves})`
                }}>
                <RunnerBox twitch={player?.social.twitch} youtube={player?.social.youtube} textSize={runnerTextSize} runner={true} pronouns={player?.pronouns} name={player?.name ?? ""} />
                {commentators.length > 0 ? <div className={`grid ${commentatorsColumns > 0 ? `grid-cols-${commentatorsColumns}` : "grid-cols-2"} `}>
                    {commentators.map((runner) =>
                        <RunnerBox runner={false} className='border-r-3 border-white' pronouns={runner.pronouns} name={runner.name} />
                    )}
                </div> : <></>}
                <SidebarSocialMedia className='' />
            </div>

        </div>
    );
}


export const L4x3_1P = () => {

  return (
    <ThemeProvider>
      <Header />
      <Sidebar4x3 />
    </ThemeProvider>
  );
};

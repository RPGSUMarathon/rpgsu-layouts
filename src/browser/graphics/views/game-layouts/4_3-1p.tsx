import { ThemeProvider } from '../../components/theme-provider';
import { Header } from '../../components/Header/Header';
import { RunnerBox } from '../../components/RunTexts/RunnerBox';
import useCurrentRun from '../../../hooks/useCurrentRun';
import useCommentators from '../../../hooks/useCommentators';
import useCameraOn from '../../../hooks/useCameraOn';
import Background from "../../img/online-background.png";
import { NoCamera } from '../../components/NoCamera';


export const Center4x3 = () => {
const currentRun = useCurrentRun();
const cameraOn = useCameraOn();
const commentators = useCommentators();

const player = currentRun?.teams[0]?.players[0];

return (
<div className={'flex h-[890px]'}>
    <div className={`flex flex-col w-112.5 h-full border-r-5 border-white`}>
        {cameraOn && cameraOn ? <div id="CameraBox" className="w-full aspect-4/3 border-b-5 border-white" /> : <div className='h-[270px] border-b-3 border-white'><NoCamera /></div>}
        <div className='h-full' style={{backgroundImage: `url(${Background})`}}>
            <RunnerBox twitch={player?.social.twitch} youtube={player?.social.youtube} runner={true} pronouns={player?.pronouns} name={player?.name ?? ""} />
            {commentators.length > 0 ? <div className={'flex-1 w-full'}>
                {commentators.map((runner) =>
                    <RunnerBox runner={false} className='flex-none' pronouns={runner.pronouns} name={runner.name} />
                    )}
                </div> : <></>}
            </div>
        </div>
        <div className={'flex-none h-full aspect-4/3'}>
        </div>
        <div className={'flex-1 border-l-5 border-l-white'} style={{backgroundImage: `url(${Background})`}}>
        </div>
    </div>
    )
    };



    export const L4x3_1P = () => {
    return (
    <ThemeProvider>
        <Header />
        <Center4x3 />
    </ThemeProvider>
    );
    };

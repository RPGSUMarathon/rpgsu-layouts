import { ThemeProvider } from '../../components/theme-provider';
import {Header} from '../../components/Header/Header';
import { RunnerBox } from '../../components/RunTexts/RunnerBox';
import { Omnibar } from '../../views/omnibar';
/* import Twitch from "../../img/icons/twitch-color.png";
import Youtube from "../../img/icons/youtube-color.png";
import Bluesky from "../../img/icons/bluesky-color.png"; */
import Logo from "../../img/logo-text.png";
import { useRunnerTextSize } from '../../../hooks/useLayoutTextSize';
import useCurrentRun from '../../../hooks/useCurrentRun';
import useCommentators from '../../../hooks/useCommentators';
import useCameraOn from '../../../hooks/useCameraOn';
import Background from "../../img/online-background.png";
import { NoCamera } from '../../components/NoCamera';


export const SidebarGBA = () => {
  const currentRun = useCurrentRun();
  const cameraOn = useCameraOn();
  const commentators = useCommentators();

    const runnerTextSize = useRunnerTextSize();

    return (
        <div className={'flex h-[900px]'} style={{backgroundImage: `url(${Background})`}}>
            <div className={`flex-none w-[450px] h-full border-r-10 border-white`}>
                {cameraOn && cameraOn ? <div id="CameraBox" className="w-full aspect-4/3 border-b-10 border-white bg-black" /> : <div className='h-[270px] border-b-3 border-white'><NoCamera /></div>}
                <div className='h-full'>
                    <RunnerBox twitch={player?.social.twitch} youtube={player?.social.youtube} textSize={runnerTextSize} runner={true} pronouns={player?.pronouns} name={player?.name ?? ""} />
                    {commentators.length > 0 ? <div className={'flex-1 w-full'}>
                        {commentators.map((runner) =>
                            <RunnerBox runner={false} className='flex-none' pronouns={runner.pronouns} name={runner.name} />
                        )}
                    </div> : <></>}
                    {/* <SidebarSocialMedia className='' /> */}
                </div>
            </div>
            <div className={'flex-none h-full aspect-3/2 bg-black'}>
            </div>
            <div className={'flex-1 border-l-10 border-l-white'}>           
            </div>
        </div>
    );
}

export const Lgba_1P = () => {
  return (
    <ThemeProvider>
        <Header />
        <SidebarGBA />
        <Omnibar />
    </ThemeProvider>
  );
};

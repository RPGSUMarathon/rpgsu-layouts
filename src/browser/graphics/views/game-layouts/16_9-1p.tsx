import { ThemeProvider } from '../../components/theme-provider';
import {Header} from '../../components/Header/Header';
import { RunnerBox } from '../../components/RunTexts/RunnerBox';
import Logo from "../../img/logo-text.png";
import Background from "../../img/online-background.png";
import useCurrentRun from '../../../hooks/useCurrentRun';
import useCommentators from '../../../hooks/useCommentators';
import useCameraOn from '../../../hooks/useCameraOn';
import { NoCamera } from '../../components/NoCamera';

const Sidebar16x9 = () => {
  const currentRun = useCurrentRun();
  const cameraOn = useCameraOn();
  const commentators = useCommentators();

  const player = currentRun?.teams[0]?.players[0];


   return (
        <div className={'flex h-225 w-full'} >
            <div className={`flex flex-col w-112.5 h-full border-r-5 border-white`}>
                {cameraOn && cameraOn ? <div id="CameraBox" className="w-full h-84.25 border-b-5 border-white" /> : <div className='h-84.25 border-b-5 border-white'><NoCamera /></div>}
                <div className='h-140.5 w-full' style={{backgroundImage: `url(${Background})`}}>
                    <RunnerBox twitch={player?.social.twitch} youtube={player?.social.youtube}  runner={true} pronouns={player?.pronouns} name={player?.name ?? ""} />
                    {commentators.length > 0 ? <div className={'flex-1 w-full'}>
                        {commentators.map((runner) =>
                            <RunnerBox runner={false} className='flex-none' pronouns={runner.pronouns} name={runner.name} />
                        )}
                    </div> : <></>}
                </div>
            </div>
            <div className={'flex flex-col h-full w-370'}>
                <div className={' w-full aspect-video'}>
                </div>
                <div className={'border-t-5 border-t-white w-full h-[70px]'} style={{backgroundImage: `url(${Background})`}}>           
                </div>
            </div>
          
        </div>
    );
}


export const L16x9_1P = () => {
  return (
    <ThemeProvider>
        <Header />
        <Sidebar16x9 />
    </ThemeProvider>
  );
};

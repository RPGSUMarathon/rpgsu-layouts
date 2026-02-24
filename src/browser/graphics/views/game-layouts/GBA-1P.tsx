import { ThemeProvider } from '../../components/theme-provider';
import {Header} from '../../components/Header/Header';
import { RunnerBox } from '../../components/RunTexts/RunnerBox';
import Logo from "../../img/logo-text.png";
import { useRunnerTextSize } from '../../../hooks/useLayoutTextSize';
import useCurrentRun from '../../../hooks/useCurrentRun';
import useCommentators from '../../../hooks/useCommentators';
import useCameraOn from '../../../hooks/useCameraOn';
import Waves from "../../img/waves.png";
import { NoCamera } from '../../components/NoCamera';


export const SidebarGBA = () => {
    const currentRun = useCurrentRun();
    const cameraOn = useCameraOn();
    const commentators = useCommentators();

    const player = currentRun?.teams[0]?.players[0];

    const runnerTextSize = useRunnerTextSize();
    const marginRatio = (commentators.length * -12) + 20;


    return (
        <div>
            <div className={`h-[965px] w-[472.5px] border-r-3 border-white"`}>
                {cameraOn && cameraOn ? <div id="CameraBox" className="w-full h-[270px] border-b-3 border-white" /> : <div className='h-[270px] border-b-3 border-white'><NoCamera /></div>}
                <div className='bg-[#278178] h-full ' style={{
                    backgroundImage: `url(${Waves})`
                }}>
                    <RunnerBox twitch={player?.social.twitch} youtube={player?.social.youtube}  textSize={runnerTextSize} runner={true} pronouns={player?.pronouns} name={player?.name ?? ""} />
                    {commentators.length > 0 ? <div className='grid grid-cols-1'>
                        {commentators.map((runner) =>
                            <RunnerBox runner={false} className='border-r-3 border-white' pronouns={runner.pronouns} name={runner.name} />
                        )}
                    </div> : <></>}
                    <div className='flex flex-col items-center justify-center'>
                        <img src={Logo} alt="Logo" className={`w-1/2`} style={{ marginTop: `calc(var(--spacing) * ${marginRatio})` }} />
                        <h2 className="drop-shadow-2xl text-2xl wrap-normal">A home for RPG Speedruns.</h2>
                    </div>
                </div>
                
            </div>
            
        </div>

    );
}

export const Lgba_1P = () => {

  return (
    <ThemeProvider>
        <Header />
        <SidebarGBA />
    </ThemeProvider>
  );
};

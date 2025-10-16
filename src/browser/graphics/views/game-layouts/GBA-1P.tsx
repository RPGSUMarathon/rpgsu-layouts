import { render } from '../../../render';
import { ThemeProvider } from '../../components/theme-provider';
import {Header} from '../../components/Header/Header';
import { RunnerBox } from '../../components/RunTexts/RunnerBox';
import Twitch from "../../img/icons/twitch-color.png";
import Youtube from "../../img/icons/youtube-color.png";
import Bluesky from "../../img/icons/bluesky-color.png";
import Logo from "../../img/logo-text.png";
import { useRunnerTextSize } from '../../../hooks/useLayoutTextSize';
import useCurrentRun from '../../../hooks/useCurrentRun';
import useCommentators from '../../../hooks/useCommentators';
import useCameraOn from '../../../hooks/useCameraOn';
import Waves from "/src/assets/waves.png";
import { NoCamera } from '../../components/NoCamera';


export const SidebarGBA = () => {
    const currentRun = useCurrentRun();
    const cameraOn = useCameraOn();
    const commentators = useCommentators();

    const player = currentRun?.teams[0]?.players[0];

    const runnerTextSize = useRunnerTextSize();
    const marginRatio = (commentators.length * -12) + 20;

    const rules = [
        'No free healing (centers, heal houses, PCs, etc) is allowed except for unskippable heals.',
        'No money can be spend except for a Fresh Water and 1 Safari trip in gen 1, and one Museum ticket in Gen 3.',
        'You cannot let your entire party faint.',
        'No glitches.'
    ]

    const half = Math.ceil(rules.length / 2);
    const firstHalf = rules.slice(0, half);
    const secondHalf = rules.slice(half);

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
                    <div id="#pokemon-rules" className='border-b-3 border-white py-2 overflow-hidden bg-[#278178]'>
                        <h3 className='text-2xl px-2'>Rules:</h3>
                        <div className='flex px-6 '>
                            <ul className='fading-div folder1'>
                                {firstHalf.map((item) =>
                                    <li className='list-disc text-lg'>{item}</li>
                                )}
                            </ul>
                            <ul className='fading-div folder2'>
                                {secondHalf.map((item) =>
                                    <li className='list-disc text-lg'>{item}</li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <img src={Logo} alt="Logo" className={`w-1/2`} style={{ marginTop: `calc(var(--spacing) * ${marginRatio})` }} />
                        <h2 className="drop-shadow-2xl text-2xl wrap-normal">A home for RPG Speedruns.</h2>
                    </div>
                </div>
            </div>
            <div className={`absolute left-[472.5px] bottom-0 w-[1447.5px] h-[155px] bg-[#278178] flex flex-row items-center justify-center gap-25 border-t-3 border-white`}>
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

const Layout2 = () => {

  return (
    <ThemeProvider>
        <Header />
        <SidebarGBA />
    </ThemeProvider>
  );
};

render(<Layout2 />);
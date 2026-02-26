import { ThemeProvider } from '../../components/theme-provider';
import { Header } from '../../components/Header/Header';
import { RunnerBox } from '../../components/RunTexts/RunnerBox';
import { Omnibar } from '../../views/omnibar';
import { useRunnerTextSize } from '../../../hooks/useLayoutTextSize';
import useCurrentRun from '../../../hooks/useCurrentRun';
import useCommentators from '../../../hooks/useCommentators';
import useCameraOn from '../../../hooks/useCameraOn';
import { useCommentatorColumnSize } from '../../../hooks/useLayoutTextSize';
import Background from "../../img/online-background.png";
import { NoCamera } from '../../components/NoCamera';
/* import Twitch from "../../img/icons/twitch.png";
import Youtube from "../../img/icons/youtube.png";
import Bluesky from "../../img/icons/bluesky.png";
import Logo from "../../img/text-banner.png"; */


type Props = {
  className?: string;
};

/* Currently Unused
 
const SidebarSocialMedia = ({ className }: Props) => {
    return (<div className={`text-center flex flex-col mx-auto my-10 items-center  ${className}`}>
        <img src={Logo} alt="Logo" />
        <div className="grid grid-flow-row">
            <div className="inline-flex items-center gap-5 text-4x1">
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
} */


export const Center4x3 = () => {
    const currentRun = useCurrentRun();
    const cameraOn = useCameraOn();
    const commentators = useCommentators();

    const player = currentRun?.teams[0]?.players[0];

  const player = currentRun?.teams[0]?.players[0];

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
            <div className={'flex-none h-full aspect-4/3 bg-black'}>
            </div>
            <div className={'flex-1 border-l-10 border-l-white'}>           
            </div>
        </div>
      )}
      <div
        className="bg-[#278178] h-full"
        style={{
          backgroundImage: `url(${Waves})`,
        }}
      >
        <RunnerBox
          twitch={player?.social.twitch}
          youtube={player?.social.youtube}
          textSize={runnerTextSize}
          runner
          pronouns={player?.pronouns}
          name={player?.name ?? ""}
        />
        {commentators.length > 0 && (
          <div
            className={`grid ${commentatorsColumns > 0 ? `grid-cols-${commentatorsColumns}` : "grid-cols-2"} `}
          >
            {commentators.map((runner) => (
              <RunnerBox
                key={runner.name}
                runner={false}
                className="border-r-3 border-white"
                pronouns={runner.pronouns}
                name={runner.name}
              />
            ))}
          </div>
        )}
        <SidebarSocialMedia className="" />
      </div>
    </div>
  );
};



export const L4x3_1P = () => {
  return (
    <ThemeProvider>
      <Header />
      <Center4x3 /> 
      <Omnibar />
    </ThemeProvider>
  );
};

import { RunnerBox } from '../../common/RunTexts/RunnerBox';
import { SidebarSocialMedia } from './SidebarSocialMedia';
import { useRunnerTextSize } from '../../../hooks/useLayoutTextSize';
import useCurrentRun from '../../../hooks/useCurrentRun';
import useCommentators from '../../../hooks/useCommentators';
import useCameraOn from '../../../hooks/useCameraOn';
import { useCommentatorColumnSize } from '../../../hooks/useLayoutTextSize';
import Waves from "/src/assets/waves.png";
import { NoCamera } from '../../common/NoCamera';


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
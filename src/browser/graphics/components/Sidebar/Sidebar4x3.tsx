import { RunnerBox } from './RunnerBox';
import { SidebarSocialMedia } from './SidebarSocialMedia';
import { useRunnerTextSize } from '../../../hooks/useLayoutTextSize';
import useCurrentRun from '../../../hooks/useCurrentRun';
import useCommentators from '../../../hooks/useCommentators';
import useCameraOn from '../../../hooks/useCameraOn';
import { useCommentatorColumnSize } from '../../../hooks/useLayoutTextSize';


export const Sidebar4x3 = () => {
    const currentRun = useCurrentRun();
    const cameraOn = useCameraOn();
    const commentators = useCommentators();
    const commentatorsColumns = useCommentatorColumnSize();

    const player = currentRun?.teams[0]?.players[0];

    const runnerTextSize = useRunnerTextSize();

    return (
        <div className={`w-[600px] h-[980px] border-r-3 border-white"`}>
            {cameraOn && <div id="CameraBox" className="w-full h-[337.5px] border-b-3 border-white" />}
            <div className='bg-gradient-to-t from-teal-800 to-teal-600 h-full'>
                <RunnerBox textSize={runnerTextSize} runner={true} pronouns={player?.pronouns} name={player?.name ?? ""} />
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
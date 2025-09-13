import { RunnerBox } from './RunnerBox';
import { SidebarSocialMedia } from './SidebarSocialMedia';

export const Sidebar4x3 = () => {

    const commentators = ["Freedom_Pulse97", ];

    return (
        <div className={`w-[600px] h-[980px] border-r-3 border-white"`}>
            <div id="CameraBox" className="w-full h-[337.5px] border-b-3 border-white" />
            <div className='bg-[#278178] h-full'>
                <RunnerBox runner={true} pronouns='He/Him/It/Its/They/Them/She/Her' name='TonyKordatos' />
                <div className='grid grid-cols-2'>
                    {commentators.map((runner) =>
                        <RunnerBox runner={false} className='border-r-3 border-white' pronouns='He/Him' name={runner} />
                    )}
                </div>
                <SidebarSocialMedia className='' />
            </div>

        </div>
    );
}
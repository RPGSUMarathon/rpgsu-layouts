import { render } from '../../render';
import { ThemeProvider } from '../common/theme-provider';
import Logo from "/src/assets/text-banner.png";
import { RunnerBox } from '../common/RunTexts/RunnerBox';
import useCurrentRun from '../../hooks/useCurrentRun';

const Finale = () => {
    const host = useCurrentRun();

    return (
        <ThemeProvider>
            <div className="h-full absolute bg-gradient-to-b from-teal-800 to-teal-600 object-cover inset-0 bottom-auto -z-1 w-full h-auto" />
            <div className="ondebox">
                <svg className="onde" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                    <defs>
                        <path id="onda" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352Z" />
                    </defs>
                    <g className="parallaxonde">
                        <use xlinkHref="#onda" x="48" y="0" fill="rgba(17,170,159,0.6" />
                        <use xlinkHref="#onda" x="48" y="3" fill="rgba(17,170,159,0.4)" />
                        <use xlinkHref="#onda" x="48" y="5" fill="rgba(17,170,159,0.1)" />
                        <use xlinkHref="#onda" x="48" y="7" fill="rgba(83, 213, 204, 0.4)" />
                    </g>
                </svg>
            </div>
            <div className='items-center justify-center z-10'>
                <img src={Logo} alt="Logo" className='w-[600px] m-auto' />
                <div className='m-auto bg-black border border-white border-3 w-[910px] h-[562.5px]'/>
                <div className='mx-auto w-[500px] border-r-3 border-white border-t-3 border-l-3 mt-10'>
                    <RunnerBox runner={false} name={host?.teams[0]?.players[0]?.name ?? ""} pronouns={host?.teams[0]?.players[0]?.pronouns} />
                </div>
            </div>
        </ThemeProvider>
    )
}

render(<Finale />);

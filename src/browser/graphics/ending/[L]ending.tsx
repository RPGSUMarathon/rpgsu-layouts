import { render } from '../../render';
import { ThemeProvider } from '../common/theme-provider';
import { useCurrentDay } from '../../hooks/useCurrentDayLogo';
import { Title } from '../common/RunTexts/Title';
import useNextRun from '../../hooks/useNextRun';
import Logo from "/src/assets/text-banner.png";


const Ending = () => {
    const day = useCurrentDay();
    const run = useNextRun();

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
            <div className='flex flex-col items-center justify-center p-20 z-10 gap-15'>
                <div className=''>
                    <Title className='text-7xl' title={`Day ${day ? day : 1}`} />
                </div>
                <img className='w-7/12' src={Logo} alt="Logo" />
                <Title className='text-7xl' title='Thank you for Watching!' />
                <h4 className='text-5xl drop-shadow'>We'll be back tomorrow with:</h4>
                <h3 className='text-6xl drop-shadow'>{run?.game}</h3>
            </div>

        </ThemeProvider>
    );
};

render(<Ending />);

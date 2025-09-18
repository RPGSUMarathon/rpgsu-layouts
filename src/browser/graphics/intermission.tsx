import { render } from '../render';
import { ThemeProvider } from './components/theme-provider';
import { RotatingImage } from './components/IntermissionAffiliate/RotatingImage';
import useCurrentDayLogo from '../hooks/useCurrentDayLogo';
import { Title } from './components/Title';
import { IntermissionInfoContainer } from './components/IntermissionAffiliate/IntermissionInfoContainer';


const Intermission = () => {
  const currentDayLogo = useCurrentDayLogo();

  return (
    <ThemeProvider>
      <div className="h-full absolute bg-gradient-to-b from-teal-800 to-teal-600 object-cover inset-0 bottom-auto -z-1 w-full h-auto" />
      <div className="ondebox">
        <svg className="onde" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
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
      <div className=' mt-5 ml-10'>
        <Title title="Day 1" />
      </div>
      <RotatingImage className='z-10' />
      <IntermissionInfoContainer className='z-10'/>
    </ThemeProvider>
  );
};

render(<Intermission />);

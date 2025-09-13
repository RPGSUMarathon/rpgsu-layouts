import { render } from '../render';
import { ThemeProvider } from './components/theme-provider';
import { RotatingImage } from './components/IntermissionAffiliate/RotatingImage';
import useCurrentDayLogo from '../hooks/useCurrentDayLogo';
import { Title } from './components/Title';
import {IntermissionInfoContainer} from './components/IntermissionAffiliate/IntermissionInfoContainer';


const Intermission = () => {
  const currentDayLogo = useCurrentDayLogo();

  return (
    <ThemeProvider>
      {/* <img src={bg_image} alt="" height={1080} width={1920} className="absolute min-h-svh object-cover inset-0 bottom-auto -z-1 w-full h-auto  bg-white" /> */}
      <div className='text-center mt-15'>
        <Title title={currentDayLogo} />
      </div>
      <RotatingImage />
      <IntermissionInfoContainer />
    </ThemeProvider>
  );
};

render(<Intermission />);

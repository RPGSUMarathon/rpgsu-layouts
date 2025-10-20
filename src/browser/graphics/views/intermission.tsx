import { render } from '../../render';
import { ThemeProvider } from '../components/theme-provider';
import { Omnibar } from './omnibar';
import { IntermissionInfoContainer } from '../components/affiliate-event-intermission/IntermissionInfoContainer';
import Logo from "../img/text-banner.png";


const Intermission = () => {

  return (
    <ThemeProvider className="bg-linear-to-b/decreasing from-[#14182d] to-[#2a8c89]">
        <div className='h-[260px] w-full border-b-2 border-[#8ca9db] bg-[#14182d]'>
          {/* This div is all the info that we'll rotate/fade in and out */}
          <div className='h-[260px] w-[800px] border-r-2 border-[#8ca9db]'>
            <img src={Logo} alt="Logo" />
          </div>

          {/* This div is the games coming up */}
          <div className=' ' />
        </div>

        {/* Image Animation */}
        <div className='absolute top-[260px] left-0'></div>
        <div className='absolute top-[260px] right-0 h-[760px] w-[720px] h-[760px] border-l-2 border-[#8ca9db]'>
          <IntermissionInfoContainer />
          <IntermissionInfoContainer />
        </div>
        <Omnibar className='absolute bottom-0 z-10 bg-[#f8f8ff]/50' />
    </ThemeProvider>
  );
};

render(<Intermission />);

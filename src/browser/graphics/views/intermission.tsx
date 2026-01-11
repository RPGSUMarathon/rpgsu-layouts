import { render } from '../../render';
import { ThemeProvider } from '../components/theme-provider';
import { Omnibar } from './omnibar';
import { IntermissionInfoContainer } from '../components/affiliate-event-intermission/IntermissionInfoContainer';
import Logo from "../img/text-banner.png";
import useCurrentRun from '../../hooks/useCurrentRun';
import useNextRun from '../../hooks/useNextRun';
import { Helpers } from '../../helpers';

const CurrentRunContainer = () => {
  const currentRun = useCurrentRun();

  const runners = currentRun?.teams
    .map((team) => team.name || team.players.map((player) => player.name).join(', '))
    .join(' vs. ') || 'No players';

  return (
    <div className='mx-10 h-[300px] my-10 shadow-2xl border-1 rounded-b-sm border-blue-300 relative'>
      <span className='pl-5 pr-8 py-2 text-2xl bg-blue-400 absolute top-[-25px] left-[-30px] rounded-l-sm container-border'>Setting up for...</span>
      <div className='text-center p-10 flex flex-col justify-around'> 
        <span className='border-b-1 border-white'>{currentRun?.game}</span>
        <div className='border-b-1 border-white'>
          <span className='border-r-1'>{currentRun?.category}</span>
          <span>{runners}</span>
        </div>
        <div className='border-b-1 border-white'>
          <span className='border-r-1'>{currentRun?.system}</span>
          <span>{currentRun?.estimate}</span>
        </div>
      </div>
    </div>
  )
}

const UpcomingRunContainer = () => {
const  nextRun = useNextRun();

  const runners = nextRun?.teams
    .map((team) => team.name || team.players.map((player) => player.name).join(', '))
    .join(' vs. ') || 'No players';

  return (
    <div className='mx-10 h-[200px] my-10 shadow-2xl border-1 rounded-b-sm border-blue-300 relative'>
      <span className='pl-5 pr-8 py-2 text-2xl bg-blue-400 absolute top-[-25px] left-[-30px] rounded-l-sm container-border'>Setting up for...</span>
      <div className='text-center p-10 flex flex-col justify-around'> 
        <span className='border-b-1 border-white'>{nextRun?.game}</span>
        <div className='border-b-1 border-white'>
          <span className='border-r-1'>{nextRun?.category}</span>
          <span>{runners}</span>
        </div>
      </div>
    </div>
  )
}

const Intermission = () => {

  return (
    <ThemeProvider className="">
      <div className='h-[260px] w-full border-b-2 border-[#8ca9db] flex flex-row'>
        {/* This div is all the info that we'll rotate/fade in and out */}
        <div className='h-[260px] w-[800px] border-r-2 border-[#8ca9db]'>
          <img src={Logo} alt="Logo" className='w-[500px] m-auto' />
        </div>

        {/* This div is the games coming up */}
        <div className='h-[260px] w-[1120px] flex flex-row' >
          <UpcomingRunContainer />
          <UpcomingRunContainer />
        </div>
      </div>

      {/* Image Animation */}
      <div className='absolute top-[260px] left-0'></div>
      <div className='absolute top-[260px] right-0 h-[760px] w-[720px] h-[760px] border-l-2 border-[#8ca9db]'>
        <CurrentRunContainer />
        <IntermissionInfoContainer />
      </div>
      <Omnibar className='absolute bottom-0 z-10 bg-[#f8f8ff]/50' />
    </ThemeProvider>
  );
};

render(<Intermission />);

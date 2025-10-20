import { render } from '../../render';
import { ThemeProvider } from '../components/theme-provider';


const Intermission = () => {

  return (
    <ThemeProvider>
      <div className='w-full h-full flex flex-col'>
        <div className='h-[260px] w-full bg-white'>

        </div>
        {/* Image */}
        <div className='absolute top-[260px] left-0'></div>
        <div className='absolute top-[260px] right-0 h-[760px] w-[720px] h-[760px] bg-red-100'></div>
      </div>
    </ThemeProvider>
  );
};

render(<Intermission />);

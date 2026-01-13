import { render } from '../../render';
import { ThemeProvider } from '../components/theme-provider';
import { Omnibar } from './omnibar';
import Logo from "../img/online-logo.png";
import useCurrentRun from '../../hooks/useCurrentRun';
import useUpcomingRuns from '../../hooks/useUpcomingRuns';
import Youtube from "../img/icons/youtube.png";
import Bluesky from "../img/icons/bluesky.png";
import {
  type RunData,
} from 'speedcontrol/src/types/schemas';
import { AutoTextSize } from 'auto-text-size';
import { Helpers } from '../../helpers';
import { timeToRun } from '../../time-to-run';

type Props = {
  text: string,
}

const FunFactContainer = ({ text }: Props) => {
  return (
    <div className='mx-10 my-10 h-[220px] shadow-2xl inset-shadow-md inset-shadow-black border-7 border-[#375481] rounded-b-sm relative bg-[#141c2f]'>
      <span className='pl-5 pr-8 py-2 text-3xl bg-[#5775a4] absolute top-[-25px] left-[-30px] rounded-sm w-[560px] font-normal italic'>Did you know...</span>
      <div className="absolute text-center flex flex-col items-center justify-center place-content-center h-[186px] top-[22px]">
        <><AutoTextSize className='font-light px-1' mode={'box'} minFontSizePx={18} maxFontSizePx={40}>{text}</AutoTextSize></>
      </div>
    </div>
  )
}

type PropsContainer = {
  index: number;
  runData: RunData;
}

const CurrentRunContainer = ({ runData }: PropsContainer) => {
  const runners = Helpers.formatPlayers(runData);

  return (
    <div className='mx-10 my-10 h-[250px] shadow-2xl border-7 border-[#375481] rounded-b-sm relative bg-[#141c2f]'>
      <span className='pl-5 pr-8 py-2 text-3xl bg-[#5775a4] absolute top-[-25px] left-[-30px] rounded-sm w-[560px] font-normal italic'>Setting up for...</span>
      <div className="text-center flex flex-col font-semibold absolute top-6.5 h-[210px] w-full">

        <div className="flex-1 auto-text-size-override border-b border-white text-center">
          <AutoTextSize as={'span'} mode='box' minFontSizePx={26} maxFontSizePx={36}>{runData?.game}</AutoTextSize>
        </div>

        <div className="flex-1 flex border-b border-white">
          <div className="flex-1 flex auto-text-size-override border-r border-white">
            <AutoTextSize mode={'box'} minFontSizePx={18} maxFontSizePx={30}>{runData?.category}</AutoTextSize>
            {/* {runData?.category} */}
          </div>
          <div className="flex-1 flex auto-text-size-override">
            <AutoTextSize mode={'box'} minFontSizePx={18} maxFontSizePx={30}>{runners}</AutoTextSize>
          </div>
        </div>


        <div className="flex-1 flex" style={{ alignItems: "center !important" }}>
          <div className="flex-1 flex auto-text-size-override border-r border-white">
            <AutoTextSize mode={'oneline'} minFontSizePx={18} maxFontSizePx={40}>{runData?.system}</AutoTextSize>
          </div>
          <div className="flex-1 flex auto-text-size-override">
            <AutoTextSize mode={'oneline'} minFontSizePx={18} maxFontSizePx={40}>{runData?.estimate}</AutoTextSize>
          </div>
        </div>


      </div>
    </div>
  )
}

const UpcomingRunContainer = ({ index, runData }: PropsContainer) => {
  const time = timeToRun(runData);
  const runners = Helpers.formatPlayers(runData);

  return (
    <div className='mx-10 h-[126px] w-[] mt-10 mb-15 shadow-xl rounded-b-sm  relative'>
      <span className={`pl-5 pr-8 py-1 text-2xl font-bold ${index % 2 == 0 ? "bg-[#6e848c]" : "bg-[#5775a4]"} absolute top-[-25px] left-[-30px] rounded-l-sm container-border`}>{time}</span>
      <div className='text-center flex flex-col justify-around'>
        <div className={`h-[75px] mt-[5px] ${index % 2 == 0 ? "bg-[#4f6c5f]/60" : "bg-[#365280]/60"} pl-1 pb-1  flex items-end justify-start`}>
          <span className="text-4xl font-medium">
            <AutoTextSize mode={'box'} minFontSizePx={28} maxFontSizePx={36}>{runData?.game}</AutoTextSize>
          </span>
        </div>

        <div className={`h-[46px] font-semibold flex justify-between px-5 ${index % 2 == 0 ? "bg-[#4f6c5f]" : "bg-[#365280]"}  items-center`}>
          <AutoTextSize mode={'oneline'} minFontSizePx={18} maxFontSizePx={28}>{runners}</AutoTextSize>
          <AutoTextSize mode={'oneline'} minFontSizePx={18} maxFontSizePx={30}>{runData?.estimate}</AutoTextSize>
        </div>
      </div>
    </div>
  )
}

const Intermission = () => {
  const currentRun = useCurrentRun();

  const upcomingRuns = useUpcomingRuns(2, (currentRun?.id ?? ""));

  const text = "This is my long text thats a fun fact added at the end"

  return (
    <ThemeProvider className="">
      <div className='absolute h-[182px] w-[1320px] border-b-5 border-white bg-black/40 flex flex-row'>
        {/* This div is all the info that we'll rotate/fade in and out */}
        <div className='h-full w-[852px] border-r-5 border-white flex flex-row text-center'>
          <img src={Logo} className='h-full ' />
          <div className='flex-1 flex-col flex items-center place-content-center'>
            <div className='text-3xl font-bold'>Follow us on social media!</div>
            <div className='text-4xl font-bold inline-flex '>
              <img width={50} height={50} src={Bluesky} alt="Bluesky Logo" />
              rpgsu.org
            </div>
            <div className='text-4xl font-bold inline-flex'>
              <img width={50} height={50} src={Youtube} alt="Youtube Logo" />
              rpgsumarathon
            </div>
          </div>
        </div>

        {/* Music*/}
        <div className='h-full w-[468px] text-center place-content-center'>
          <div className='w-full h-[6px] bg-[#5775a4]' />
          <div className='bg-[#141c2f] py-1'>
            <span className='text-3xl font-bold' style={{ textShadow: "0px 0px 5px #08DFF7" }}>Now Playing</span>
          </div>
          <div className='bg-[#3f4d67] h-[50px] w-full'></div>
          <div className='bg-[#141c2f] h-[50px] w-full'></div>
          <div className='w-full h-[6px] bg-[#5775a4]' />

        </div>

      </div>

      {/* Image Animation */}
      <div className='absolute top-[260px] left-0'></div>
      <div className='absolute  right-0 w-[605px] h-[1020px] border-l-5 border-white space-y-3'>
        {upcomingRuns && upcomingRuns.length > 0 && (
          <>
            {upcomingRuns.reverse().map((run, index) => {
              return (<UpcomingRunContainer key={run.id} index={index} runData={run} />)
            })}
          </>
        )
        }
        {currentRun && <CurrentRunContainer index={0} runData={currentRun} />}
        {/* {currentRun?.customData["fact"] && <FunFactContainer text={currentRun?.customData["fact"]} />} */}
        <FunFactContainer text={text} />

      </div>
      <Omnibar className='absolute bottom-0 z-10 ' />
    </ThemeProvider>
  );
};

render(<Intermission />);

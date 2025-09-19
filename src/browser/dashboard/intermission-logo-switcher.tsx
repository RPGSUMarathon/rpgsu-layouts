import { DashboardThemeProvider } from './components/DashboardThemeProvider';
import { render } from '../render';
import { useReplicant } from '@nodecg/react-hooks';
import { useEffect } from 'react';

export const IntermissionLogoSwitcher = () => {
  const [currentDay, setCurrentDay] = useReplicant<number>('currentDayAtIntermission');
  const [currentDayLogo, setCurrentDayLogo] = useReplicant<string>('currentDayLogoAtIntermission');

  useEffect(() => {
    if (currentDayLogo === undefined) return;

    setCurrentDayLogo(currentDayLogo);
  }, [currentDayLogo]);

  const games = ["Dragon Quest", "Xenogears", "Xenoblade", "Shin Megami Tensei", "Yakuza", "Kingdom Hearts", "Expedition", "Saga", "Final Fantasy", "Pokemon",]
  const days = [1, 2, 3, 4, 5, 6, 7];

  return (
    <DashboardThemeProvider>
      <h3><b>Day Selected:</b> {currentDay}</h3>
      <div className='grid gap-3 grid-cols-4'>
        {
          days.map((day) =>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded" onClick={() => {
              setCurrentDay(day);
            }}>
              {day}
            </button>
          )
        }
      </div>
      <h3><b>Game Selected:</b> {currentDayLogo}</h3>
      <div className='grid gap-3 grid-cols-4'>
        {
          games.map((day) =>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded" onClick={() => {
              setCurrentDayLogo(day);
            }}>
              {day}
            </button>
          )
        }
      </div>

    </DashboardThemeProvider>
  );
};

render(<IntermissionLogoSwitcher />);
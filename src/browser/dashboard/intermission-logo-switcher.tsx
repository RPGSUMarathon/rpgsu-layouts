import { DashboardThemeProvider } from './components/DashboardThemeProvider';
import { render } from '../render';
import { useReplicant } from '@nodecg/react-hooks';
import { useEffect } from 'react';

export const IntermissionLogoSwitcher = () => {
  const [currentDay, setCurrentDay] = useReplicant<string>('currentDayAtIntermission');

  useEffect(() => {
    if (currentDay === undefined) return;

    setCurrentDay(currentDay);
  }, [currentDay]);

  const days = ["Dragon Quest", "Xenogears", "Xenoblade", "Shin Megami Tensei", "Yakuza", "Kingdom Hearts", "Expedition", "Saga", "Final Fantasy", "Pokemon", ]

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

    </DashboardThemeProvider>
  );
};

render(<IntermissionLogoSwitcher />);
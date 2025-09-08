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

  const days = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8",]

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
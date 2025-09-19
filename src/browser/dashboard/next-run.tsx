import { DashboardThemeProvider } from './components/DashboardThemeProvider';
import { render } from '../render';
import { useReplicant } from '@nodecg/react-hooks';
import { Timer } from '../../../../nodecg-speedcontrol/src/types/schemas/timer';
import { useEffect, useState } from 'react';
import useNextRun from '../hooks/useNextRun';
import useCurrentObsScene from '../hooks/useCurrentObsScene';

const intermissionSceneName = nodecg.bundleConfig.obs.scenes?.intermission;

export const App = () => {
  const currentObsScene = useCurrentObsScene();
  const [timer] = useReplicant<Timer | undefined>('timer', {
    bundle: 'nodecg-speedcontrol',
  });
  const [nextRunGameName, setNextRunGameName] = useState<string>('');
  const nextRun = useNextRun();

  const getNextRunGameName = () => {
    if (nextRun && nextRun.game) {
      return `${nextRun.game.slice(0, 35)}${nextRun.game.length > 35 ? '...' : ''}`;
    }
    return 'Break';
  };

  useEffect(() => {
    setNextRunGameName(getNextRunGameName());
  }, [nextRun]);

  const disableChange =
    (timer && ['running', 'paused'].includes(timer.state)) ||
    currentObsScene === intermissionSceneName;

  return (
    <DashboardThemeProvider>
      <div className='flex flex-row gap-2'>
        <button
        disabled={disableChange || !nextRun}
        className='bg-gray-200 rounded shadow hover:bg-gray-300'
          onClick={() => {
            if(nextRunGameName == "Break"){
              nodecg.sendMessage('switchToEnding');
              console.log("Ending")
            }
            else if (nextRun) {
              nodecg.sendMessage('switchToIntermission');
              console.log("Intermission")
            }
          }}>
          <span>
            {nextRun ? <>{nextRunGameName}</> : nextRun ? <>No next runs</> : <>No added runs</>}
          </span>
        </button>
        {disableChange && <h2>You cannot change the game right now.</h2>}
      </div>
    </DashboardThemeProvider>
  );
};

render(<App />);
import { DashboardThemeProvider } from './components/DashboardThemeProvider';
import { render } from '../render';
import { useReplicant } from '@nodecg/react-hooks';
import { Timer } from '../../../bundles/nodecg-speedcontrol/src/types/schemas/timer';
import { useEffect, useState } from 'react';
import useNextRun from '../hooks/useNextRun';
import useCurrentObsScene from '../hooks/useCurrentObsScene';

const intermissionSceneName = nodecg.bundleConfig.obs.scenes?.intermission;

export const App = () => {
  const currentObsScene = useCurrentObsScene();
  const nextRun = useNextRun();

  const [timer] = useReplicant<Timer | undefined>('timer', {
    bundle: 'nodecg-speedcontrol',
  });
  const [nextRunGameName, setNextRunGameName] = useState<string>('');


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
      <div className='flex flex-col gap-2'>
        <button
          disabled={disableChange || !nextRun}
          className={`${disableChange? "bg-gray-400" : " bg-blue-500 hover:bg-blue-700/50"} rounded-lg shadow-lg  p-2`}
          onClick={() => {
            if (nextRun) {
              nodecg.sendMessage('switchToIntermission');
            }
          }}>
          <span>
            {nextRun ? <>{nextRunGameName}</> : nextRun ? <>No next runs</> : <>No added runs</>}
          </span>
        </button>
        {disableChange &&
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p className="font-bold">Be Warned</p>
            <h2>You cannot change the game right now. Will be available once run ends.</h2>
          </div>
        }
      </div>
    </DashboardThemeProvider>
  );
};

render(<App />);
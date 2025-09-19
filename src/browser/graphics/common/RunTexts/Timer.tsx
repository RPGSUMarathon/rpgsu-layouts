import { useReplicant } from '@nodecg/react-hooks';
import { CSSProperties } from 'react';
import { Timer as TimerType } from '../../../../../nodecg-speedcontrol/src/types/schemas/timer';

type TimerProps = {
  style?: CSSProperties;
  className?: string;
};

const timerColors = {
  running: 'white',
  finished: '#bbeee8ff',
  stopped: '#dfdadaff',
  paused: '#d6d2d2ff',
};

export const Timer = ({ style, className }: TimerProps) => {
  const [timer] = useReplicant<TimerType>('timer', { bundle: 'nodecg-speedcontrol' });

  return (
    <div
      style={{
        display: 'flex',
        textAlign: 'center',
        fontSize: '40px',
        justifyContent: 'center',
        textShadow: "0px 0px 5px #000000ff",
        ...style,
      }}>
      {timer && (
        <div className={`${className} ${timer.state == "finished" ? "shine-animation" :"" }`} style={{ color: timerColors[timer.state], transition: 'color 0.5s' }}>
          {timer.time}
        </div>
      )}
    </div>
  );
};
import { CSSProperties } from 'react';
import useCurrentRun from '../../../hooks/useCurrentRun';
import EstimateLogo from "../../img/icons/timer.png";


type EstimateProps = {
    style?: CSSProperties;
};

export const Estimate = ({ style }: EstimateProps) => {
    const currentRun = useCurrentRun();

    return (
        <div className='inline-flex align-center gap-3' style={style}>
            <img width={35} height={30} src={EstimateLogo} alt="Estimate Icon" />

            {currentRun && currentRun.estimate && <div>{currentRun.estimate}</div>}
        </div>
    );
};
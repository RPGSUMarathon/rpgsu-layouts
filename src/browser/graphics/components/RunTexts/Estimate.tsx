import { CSSProperties } from 'react';
import useCurrentRun from '../../../hooks/useCurrentRun';

type EstimateProps = {
    style?: CSSProperties;
};

export const Estimate = ({ style }: EstimateProps) => {
    const currentRun = useCurrentRun();

    return (
        <div>
            {currentRun && currentRun.estimate && <div>{currentRun.estimate}</div>}
        </div>
    );
};
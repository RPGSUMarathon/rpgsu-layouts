import { CSSProperties } from 'react';
import useCurrentRun from '../../../hooks/useCurrentRun';


export const Category = () => {
    const currentRun = useCurrentRun();

    return (
        <div>
            {currentRun && currentRun.category && (
                <span>{currentRun.category}</span>
            )}
        </div>
    );
};
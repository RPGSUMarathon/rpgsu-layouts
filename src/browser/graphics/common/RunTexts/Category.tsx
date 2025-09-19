import { CSSProperties } from 'react';
import useCurrentRun from '../../../hooks/useCurrentRun';
import CategoryLogo from "../../img/icons/category.png";


export const Category = () => {
    const currentRun = useCurrentRun();

    return (
        <div className='inline-flex align-center gap-3'>
            <img width={30} height={30} src={CategoryLogo} alt="Category Icon" />
            {currentRun && currentRun.category && (
                <span>{currentRun.category}</span>
            )}
        </div>
    );
};
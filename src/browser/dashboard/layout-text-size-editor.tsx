import { render } from '../render';
import { DashboardThemeProvider } from './components/DashboardThemeProvider';
import { useState, useEffect } from 'react';
import { useReplicant } from '@nodecg/react-hooks';



export const LayoutTextSizeEditor = () => {
    const [shownWarning, setShownWarning] = useState(false);

    const [gameTextSize, setGameTextSize] = useReplicant<string>('layoutGameTextSize');

    const textSizes = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl"]

    return (<DashboardThemeProvider>
        <div></div>
        <h3>Edit Game Title Size:</h3>
        <div className="inline-flex">
            {textSizes.map((size, index) =>
                <button onClick={() => {
                    setGameTextSize(size);
                }} 
                className={`${gameTextSize == size ? "bg-blue-200" : "bg-gray-300"} hover:bg-gray-400 text-gray-800 font-bold uppercase py-2 px-4 ${index == 0 ? "rounded-l" : (index == (textSizes.length - 1) ? "rounded-r" : "")}`}>
                    {size}
                </button>
            )}
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded" onClick={() => {

        }}>
            Apply
        </button>
    </DashboardThemeProvider>)
}

render(<LayoutTextSizeEditor />)
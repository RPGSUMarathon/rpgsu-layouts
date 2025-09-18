import { render } from '../render';
import { DashboardThemeProvider } from './components/DashboardThemeProvider';
import { useState, useEffect } from 'react';
import { useReplicant } from '@nodecg/react-hooks';



export const LayoutTextSizeEditor = () => {
    const [shownWarning, setShownWarning] = useState(false);

    const [gameTextSize, setGameTextSize] = useReplicant<string>('layoutGameTextSize');
    const [categoryTextSize, setCategoryTextSize] = useReplicant<string>('categoryTextSize');
    const [runnerTextSize, setRunnerTextSize] = useReplicant<string>('runnerTextSize');
    const [commentatorColumnSize, setCommentatorColumnSize] = useReplicant<number>('commentatorColumnSize');

    const textSizes = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl"]
    const columnNumbers = [1,2];

    return (<DashboardThemeProvider>
        <button onClick={() => {
            setGameTextSize("3xl");
            setCategoryTextSize("3xl");
            setRunnerTextSize("2xl");
            setCommentatorColumnSize(-1);
        }} className='bg-blue-300 hover:bg-gray-400 text-gray-800 font-bold uppercase py-2 px-4'>Reset</button>
        <h3 className='font-bold'>Edit Game Title Size:</h3>
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
        <h3 className='font-bold'>Edit Category Title Size:</h3>
        <div className="inline-flex">
            {textSizes.map((size, index) =>
                <button onClick={() => {
                    setCategoryTextSize(size);
                }} 
                className={`${categoryTextSize == size ? "bg-blue-200" : "bg-gray-300"} hover:bg-gray-400 text-gray-800 font-bold uppercase py-2 px-4 ${index == 0 ? "rounded-l" : (index == (textSizes.length - 1) ? "rounded-r" : "")}`}>
                    {size}
                </button>
            )}
        </div>
        <h3 className='font-bold'>Edit Runner Title Size:</h3>
        <div className="inline-flex">
            {textSizes.map((size, index) =>
                <button onClick={() => {
                    setRunnerTextSize(size);
                }} 
                className={`${runnerTextSize == size ? "bg-blue-200" : "bg-gray-300"} hover:bg-gray-400 text-gray-800 font-bold uppercase py-2 px-4 ${index == 0 ? "rounded-l" : (index == (textSizes.length - 1) ? "rounded-r" : "")}`}>
                    {size}
                </button>
            )}
        </div>
        <h3 className='font-bold'>Edit Commentator Column:</h3>
        <div className="inline-flex">
            {columnNumbers.map((size, index) =>
                <button onClick={() => {
                    setCommentatorColumnSize(size);
                }} 
                className={`${commentatorColumnSize == size ? "bg-blue-200" : "bg-gray-300"} hover:bg-gray-400 text-gray-800 font-bold uppercase py-2 px-4 ${index == 0 ? "rounded-l" : (index == (columnNumbers.length - 1) ? "rounded-r" : "")}`}>
                    {size}
                </button>
            )}
        </div>
    </DashboardThemeProvider>)
}

render(<LayoutTextSizeEditor />)
import {Timer, Game, Estimate, Category} from '../RunTexts';
import {useGameTextSize, useCategoryTextSize} from '../../../hooks/useLayoutTextSize';

export const Header = () => {
    const gameTextSize = useGameTextSize();
    const categoryTextSize = useCategoryTextSize();

    return (
        <div className='w-full h-[115px] border-b-3 border-white flex flex-row bg-gradient-to-b from-teal-800 to-teal-700'>
            <div className='w-[820px] h-[115px] border-r-5 border-white'>
                <div className='h-1/2 border-b-2 border-white p-2'>
                    <span className={`mt-1 drop-shadow text-white font-medium break-words wrap-normal ${gameTextSize ? `text-${gameTextSize}` : "text-3xl"}`}>
                        <Game />
                    </span>
                </div>
                <div className='h-1/2 flex flex-row items-center'>
                    <span className={`h-full min-w-1/2 p-3 border-r-5 border-white text-white font-medium break-words wrap-normal ${categoryTextSize ? `text-${categoryTextSize}` : "text-3xl"}`}>
                        <Category />
                    </span>
                    <span className="h-full p-3 border-white mx-auto text-3xl break-words wrap-normal">
                        <Estimate />
                    </span>
                </div>
            </div>
            <div className='w-[400px] border-r-5 border-white flex items-center justify-center text-center'>
                <Timer className='text-7xl drop-shadow' />
            </div>
        </div>
    );
}
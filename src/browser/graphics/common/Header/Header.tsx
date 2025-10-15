import { CrossOverLogo } from '../../intermission/components/CrossOverLogo';
import { Timer, Game, Estimate, Category } from '../RunTexts';
import { useGameTextSize, useCategoryTextSize } from '../../../hooks/useLayoutTextSize';
import logo from "../../img/logo-sword.png";

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
            <div className={`w-[700px] h-[115px] flex flex-row p-2 items-center justify-center gap-5 `}>
                <img src={logo} className="h-full object-contain" alt="Logo" />
                <h2 className={`drop-shadow text-8xl tracking-widest`} style={{
                    WebkitTextStroke: "10px #278178",
                    paintOrder: "stroke fill",
                    textShadow: "0px 0px 10px #000000ff",
                    fontFamily: "Futura PT",
                }}>
                    RPGSU
                </h2>
             </div>
        </div>
    );
}
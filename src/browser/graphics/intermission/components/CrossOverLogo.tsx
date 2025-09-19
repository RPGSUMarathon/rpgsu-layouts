import Logo from "/src/assets/text-banner.png";
import DQ from "/src/assets/DQ.png";
import E33 from "/src/assets/e33.png";
import FF from "/src/assets/FF.png";
import KH from "/src/assets/KH.png";
import Pokemon from "/src/assets/Pokemon.png";
import SMT from "/src/assets/smt.png";
import Xeno from "/src/assets/xenoblade.png";
import Yakuza from "/src/assets/yakuza.png";
import Saga from "/src/assets/saga.png";
import Xenogears from "/src/assets/xenogears.png";
import useCurrentDayLogo from '../../../hooks/useCurrentDayLogo';


type Props = {
    className?: string,
}


export const CrossOverLogo = ({ className }: Props) => {
    const currentDayLogo = useCurrentDayLogo();

    let currentImage = "";
    switch (currentDayLogo) {
        case "Pokemon": currentImage = Pokemon; break;
        case "Dragon Quest": currentImage = DQ; break;
        case "Expedition": currentImage = E33; break;
        case "Final Fantasy": currentImage = FF; break;
        case "Kingdom Hearts": currentImage = KH; break;
        case "Shin Megami Tensei": currentImage = SMT; break;
        case "Xenoblade": currentImage = Xeno; break;
        case "Yakuza": currentImage = Yakuza; break;
        case "Xenogears": currentImage = Xenogears; break;
        case "Saga": currentImage = Saga; break;

    }

    if (!currentImage) {
        return null;
    }

    return (
        <div className={`w-full h-full flex flex-row p-2 items-center justify-center ${className}`}>
            <img src={Logo} className="w-full h-full object-contain p-2" alt="Logo" />
            <h2 className={`drop-shadow text-5xl font-thin ${className}`} style={{
                WebkitTextStroke: "6px #278178",
                paintOrder: "stroke fill",
                textShadow: "0px 0px 5px #000000ff",
                fontFamily: "Arial"
            }}>
                X
            </h2>
            <img src={currentImage} className="w-full h-full object-contain drop-shadow-white drop-shadow-xs" alt="Logo" />
        </div>
    );
}
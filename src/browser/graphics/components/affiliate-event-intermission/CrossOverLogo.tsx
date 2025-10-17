import Logo from "../../img/text-banner.png";
import DQ from "/src/assets/DQ.png";
import E33 from "/src/assets/e33.png";
import FF from "/src/assets/FF.png";
import KH from "/src/assets/KH.png";
import Pokemon from "/src/assets/Pokemon.png";
import SMT from "/src/assets/smt.png";
import Xeno from "/src/assets/xenoblade.png";
import Yakuza from "/src/assets/yakuza.png";
import Persona from "/src/assets/persona.png";
import Saga from "/src/assets/saga.png";
import Xenogears from "/src/assets/xenogears.png";
import logo from "../../img/logo-text.png";
import {useCurrentDayLogo} from '../../../hooks/useCurrentDayLogo';


type Props = {
    className?: string,
}


export const CrossOverLogo = ({ className }: Props) => {
    const currentDayLogo = useCurrentDayLogo();

    let currentImage = "";
    switch (currentDayLogo) {
        case "Pokemon": currentImage = Pokemon; break;
        case "DQ": currentImage = DQ; break;
        case "E33": currentImage = E33; break;
        case "FF": currentImage = FF; break;
        case "KH": currentImage = KH; break;
        case "SMT": currentImage = SMT; break;
        case "Xenoblade": currentImage = Xeno; break;
        case "Yakuza": currentImage = Yakuza; break;
        case "Xenogears": currentImage = Xenogears; break;
        case "Saga": currentImage = Saga; break;
        case "Persona": currentImage = Persona; break;
        default:
            currentImage = logo; break;
    }

    if (!currentImage) {
        return null;
    }

    return (
        <div className={`w-full h-full flex flex-row p-2 items-center justify-center gap-5 ${className}`}>
            <img src={Logo} className="h-full object-contain" alt="Logo" />
            <h2 className={`drop-shadow text-5xl font-thin ${className}`} style={{
                WebkitTextStroke: "6px #278178",
                paintOrder: "stroke fill",
                textShadow: "0px 0px 5px #000000ff",
                fontFamily: "Arial"
            }}>
                X
            </h2>
            <img src={currentImage} className="max-w-[800px] h-full object-contain drop-shadow-white drop-shadow-xs" alt="Logo" />
        </div>
    );
}
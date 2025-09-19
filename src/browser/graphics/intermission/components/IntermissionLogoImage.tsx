import "../styles.css";
import type { ImgHTMLAttributes } from 'react';
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


export const IntermissionLogoImage = ({ className, ...imgProps }: ImgHTMLAttributes<HTMLImageElement>) => {
    const currentDayLogo = useCurrentDayLogo();

    let currentImage = "";
    switch(currentDayLogo){
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
    <img {...imgProps} className={className} src={currentImage} alt={imgProps.alt ?? ""} />
  );
};
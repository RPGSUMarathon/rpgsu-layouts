import "../styles.css";
import DQ from "/src/assets/DQ.png";
import E33 from "/src/assets/e33.png";
import FF from "/src/assets/FF.png";
import KH from "/src/assets/KH.png";
import Pokemon from "/src/assets/Pokemon.png";
import SMT from "/src/assets/smt.png";
import Xeno from "/src/assets/xenoblade.png";
import Yakuza from "/src/assets/yakuza.png";
import useCurrentDayLogo from '../hooks/useCurrentDayLogo';


export const IntermissionLogoImage = () => {
    const currentDayLogo = useCurrentDayLogo();

    let currentImage = "";
    switch(currentDayLogo){
        case "Day 1": currentImage = Pokemon; break;
        case "Day 2": currentImage = DQ; break;
        case "Day 3": currentImage = E33; break;
        case "Day 4": currentImage = FF; break;
        case "Day 5": currentImage = KH; break;
        case "Day 6": currentImage = SMT; break;
        case "Day 7": currentImage = Xeno; break;
        case "Day 8": currentImage = Yakuza; break;

    }

  if (!currentImage) {
    return null;
  }

  return (
    <img src={currentImage} alt="" />
  );
};
import Logo from "/src/assets/text-banner.png";
import DQ from "/src/assets/Metaphor.png";

type Props = {
    className?: string,
}


export const CrossOverLogo = ({ className }: Props) => {
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
            <img src={DQ} className="w-full h-full object-contain" alt="Logo" />
        </div>
    );
}
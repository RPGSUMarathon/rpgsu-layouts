type Props = {
    type: string,
    title: string,
    className?: string,
}

export const InfoBox = ({ type, title, className }: Props) => {
    return (
        <div className={`${className ?? ''} h-full relative`}>
            <div className="absolute top-0 left-0  bg-[#278178]/70 text-white text-md px-2 py-0.5">
                {type}
            </div>
            <span className="static p-3 text-black">{title}</span>
        </div>
    );
}
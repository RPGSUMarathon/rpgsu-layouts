export const Title = ({ title, className = '' }: { title: string, className?: string }) => {
    return <h2 className={`drop-shadow-2xl ${className}`} style={{
          WebkitTextStroke: "6px #278178",
          paintOrder: "stroke fill",
          textShadow: "0px 0px 5px #000000ff"
    }}>
        {title}
    </h2>
}
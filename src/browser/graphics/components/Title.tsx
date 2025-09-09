export const Title = ({ title }: { title: string }) => {
    return <h2 className="drop-shadow-2xl text-7xl" style={{
          WebkitTextStroke: "6px #278178",
          paintOrder: "stroke fill",
          textShadow: "0px 0px 5px #000000ff"
    }}>
        {title}
    </h2>
}
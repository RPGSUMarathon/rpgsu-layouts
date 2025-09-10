export const IntermissionInfoContainer = () => {
    const game = "Kingdom Hearts: Birth By Sleep 350/2 A lot days"
    const runner = "TonyKordatos";
    const category = "Any% JSP CST BST"

    return (
        <div className="border border-5 border-white grid grid-flow-row text-center w-4/12 mx-auto shadow" style={{
            backgroundColor: "var(--color-bs-header)"
        }}>
            <div className="p-8 relative">
                <div className="absolute top-0 left-0 bg-[#278178]/70 text-white text-md px-2 py-0.5 ">
                    Game
                </div>
                <span className="text-2xl drop-shadow">{game}</span>
            </div>
            <div className="grid grid-flow-col">
                <div className="border border-t-5 border-r-5 p-8 relative">
                    <div className="absolute top-0 left-0  bg-[#278178]/70 text-white text-md px-2 py-0.5">
                        Category
                    </div>
                    <span className="text-2xl drop-shadow">{category}</span>
                </div>
                <div className="border border-t-5 p-8 relative">
                    <div className="absolute top-0 left-0  bg-[#278178]/70 text-white text-md px-2 py-0.5">
                        Runner
                    </div>
                    <span className="text-2xl drop-shadow">{runner}</span>
                </div>
            </div>
        </div>
    );
}

export const IntermissionInfoContainer = () => {
    const game = "Kingdom Hearts: Birth By Sleep 350/2 A lot days"
    const runner = "TonyKordatos";
    const category = "Any% JSP CST BST"

    return(
        <div className="border border-5 border-white grid grid-flow-row text-center w-4/12 mx-auto" style={{
            backgroundColor: "var(--color-bs-header)"
        }}>
            <div className="p-5">
                <span className="text-xl drop-shadow">{game}</span>
            </div>
            <div className="grid grid-flow-col">
                <div className="border border-t-5 border-r-5 p-5">
                    <span className="text-xl drop-shadow">{category}</span>
                </div>
                <div className="border border-t-5 p-5">
                    <span className="text-xl drop-shadow">{runner}</span>
                </div>
            </div>
        </div>
    );
}
import Logo from "../img/logo-text.png";

export const NoCamera = () => {
    return(
        <div className="w-full h-full flex items-center align-center justify-center bg-[#334b59]">
            <img className="max-w-1/2 max-h-1/2" src={Logo} alt="Logo" />
        </div>
    );
}
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { GameDonationContainer } from "../OfflineEvent/GameDonationContainer";
import { HeaderInfoContainer } from "../OfflineEvent/HeaderInfoContainer";
import { Category, Estimate, Game, Timer } from "../RunTexts";
import "../../css/toastify.css";

export const Header = () => {
  const exampleDonation =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  const notify = () =>
    toast(GameDonationContainer, {
      data: {
        name: "sioneus",
        amount: "90€",
        message: exampleDonation,
      },
    });

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     notify();
  //   }, 100000);

  //   return () => clearInterval(interval);
  // });

  notify();

  return (
    <div className="w-full h-32.5 theme-border-b flex flex-row bg-linear-to-b bg-(--color-world-dark)">
      <div className="flex-none w-183.75 h-32.5 theme-border-r">
        <div className="h-1/2 theme-border-b theme-border-box">
          <Game />
        </div>
        <div className="h-1/2 flex flex-row items-center">
          <span
            className={`h-full w-114.25  theme-border-r theme-border-box text-white `}
          >
            <Category />
          </span>
          <span className="h-full w-71.25 theme-border-box">
            <Estimate />
          </span>
        </div>
      </div>
      <div className="h-full w-112.5 theme-border-r theme-border-box ">
        <Timer className="font-bold drop-shadow" />
      </div>
      <div className="flex-1 theme-border-box relative">
        <ToastContainer autoClose={10000} limit={1} />
        <HeaderInfoContainer />
      </div>
    </div>
  );
};

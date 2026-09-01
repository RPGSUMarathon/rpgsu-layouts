import ILGALogo from "../../../img/offline2026/ilga-full-logo.png";

export const CharityLogoContainer = () => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-black text-4xl">Raising money for</span>
      <img width={400} src={ILGALogo} />
    </div>
  );
};

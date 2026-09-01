import Zutphen from "../../../img/zutphen.png";

export const LocationContainer = () => {
  return (
    <div className="flex flex-col w-full h-full gap-5 text-2xl text-black items-center">
      <span className="text-4xl">We are currently live from</span>
      <img width={450} src={Zutphen} />
      <span className="text-3xl">Fletcher Hotel-Resort Zutphen</span>
    </div>
  );
};

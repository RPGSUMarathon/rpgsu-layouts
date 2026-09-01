import { useReplicant } from "@nodecg/react-hooks";
import { Header } from "../../components/Header/Header";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import backgroundImage from "../../img/offline2026/offline-background.png";

export const Center4x3 = () => {
  const [backgroundToggleOn] = useReplicant<boolean>("backgroundToggleOn", {
    defaultValue: false,
  });
  return (
    <div className="flex h-[890px]">
      <Sidebar />
      <div
        className="flex-1 theme-border-r theme-border-box bg-(--color-panel-light)"
        style={{
          backgroundImage: backgroundToggleOn
            ? `url(${backgroundImage})`
            : "none",
        }}
      />
      <div className="flex-none h-full aspect-4/3 theme-border-box" />
      <div
        className="flex-1 theme-border-l theme-border-box bg-(--color-panel-light)"
        style={{
          backgroundImage: backgroundToggleOn
            ? `url(${backgroundImage})`
            : "none",
        }}
      />
    </div>
  );
};

export const L4x3_1P = () => {
  return (
    <>
      <Header />
      <Center4x3 />
    </>
  );
};

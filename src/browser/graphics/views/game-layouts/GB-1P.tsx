import { useReplicant } from "@nodecg/react-hooks";
import { Header } from "../../components/Header/Header";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import backgroundImage from "../../img/offline2026/offline-background.png";

const SidebarGB = () => {
  const [backgroundToggleOn] = useReplicant<boolean>("backgroundToggleOn", {
    defaultValue: false,
  });
  return (
    <div className="flex h-225">
      <Sidebar />
      <div
        className="w-145 theme-border-r theme-border-box bg-(--color-panel-light)"
        style={{
          backgroundImage: backgroundToggleOn
            ? `url(${backgroundImage})`
            : "none",
        }}
      />
      <div className="flex-none h-full aspect-square theme-border-box" />
      <div
        className="w-145 theme-border-l theme-border-box bg-(--color-panel-light)"
        style={{
          backgroundImage: backgroundToggleOn
            ? `url(${backgroundImage})`
            : "none",
        }}
      />
    </div>
  );
};

export const Lgb_1P = () => {
  return (
    <>
      <Header />
      <SidebarGB />
    </>
  );
};

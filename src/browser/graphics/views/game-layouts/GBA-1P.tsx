import { useReplicant } from "@nodecg/react-hooks";
import { Header } from "../../components/Header/Header";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import backgroundImage from "../../img/offline2026/offline-background.png";

const SidebarGBA = () => {
  const [backgroundToggleOn] = useReplicant<boolean>("backgroundToggleOn", {
    defaultValue: false,
  });

  return (
    <div className="flex h-225">
      <Sidebar />

      <div className="flex-none h-full aspect-3/2 theme-border-box" />
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

export const Lgba_1P = () => {
  return (
    <>
      <Header />
      <SidebarGBA />
    </>
  );
};

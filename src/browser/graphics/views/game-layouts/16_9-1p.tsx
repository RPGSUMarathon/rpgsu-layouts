import { useReplicant } from "@nodecg/react-hooks";
import { Header } from "../../components/Header/Header";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import backgroundImage from "../../img/offline2026/offline-background.png";

const Sidebar16x9 = () => {
  const [backgroundToggleOn] = useReplicant<boolean>("backgroundToggleOn", {
    defaultValue: false,
  });
  return (
    <div className="flex h-225 w-full">
      <Sidebar />
      <div className="flex flex-col h-full w-370">
        <div className=" w-full aspect-video theme-border-box" />
        <div
          className="theme-border-t w-full h-[70px] theme-border-box bg-(--color-panel-light)"
          style={{
            backgroundImage: backgroundToggleOn
              ? `url(${backgroundImage})`
              : "none",
          }}
        />
      </div>
    </div>
  );
};

export const L16x9_1P = () => {
  return (
    <>
      <Header />
      <Sidebar16x9 />
    </>
  );
};

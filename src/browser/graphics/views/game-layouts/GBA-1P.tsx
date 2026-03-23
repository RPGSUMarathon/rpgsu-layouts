import { useReplicant } from "@nodecg/react-hooks";
import { Header } from "../../components/Header/Header";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { ThemeProvider } from "../../components/theme-provider";
import backgroundImage from "../../img/online-background.png";

const SidebarGBA = () => {
  const [backgroundToggleOn] = useReplicant<boolean>("backgroundToggleOn", {
    defaultValue: false,
  });

  return (
    <div className="flex h-225">
      <Sidebar />

      <div className="flex-none h-full aspect-3/2 " />
      <div
        className="flex-1 border-l-5 border-l-white"
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
    <ThemeProvider>
      <Header />
      <SidebarGBA />
    </ThemeProvider>
  );
};

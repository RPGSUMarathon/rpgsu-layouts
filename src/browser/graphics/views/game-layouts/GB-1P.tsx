import { useReplicant } from "@nodecg/react-hooks";
import { Header } from "../../components/Header/Header";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { ThemeProvider } from "../../components/theme-provider";
import backgroundImage from "../../img/online-background.png";

const SidebarGB = () => {
  const [backgroundToggleOn] = useReplicant<boolean>("backgroundToggleOn", {
    defaultValue: false,
  });
  return (
    <div className="flex h-225">
      <Sidebar />
      <div
        className="w-145 border-r-5 border-l-white"
        style={{
          backgroundImage: backgroundToggleOn
            ? `url(${backgroundImage})`
            : "none",
        }}
      />
      <div className="flex-none h-full aspect-square " />
      <div
        className="w-145 border-l-5 border-l-white"
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
    <ThemeProvider>
      <Header />
      <SidebarGB />
    </ThemeProvider>
  );
};

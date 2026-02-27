import { Header } from "../../components/Header/Header";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { ThemeProvider } from "../../components/theme-provider";
import Background from "../../img/online-background.png";

const SidebarGBA = () => {
  return (
    <div className="flex h-225">
      <Sidebar />
      <div className="flex-none h-full aspect-3/2 " />
      <div
        className="flex-1 border-l-10 border-l-white"
        style={{ backgroundImage: `url(${Background})` }}
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

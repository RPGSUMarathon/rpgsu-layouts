import { Header } from "../../components/Header/Header";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { ThemeProvider } from "../../components/theme-provider";
import Background from "../../img/online-background.png";

const SidebarGB = () => {
  return (
    <div className="flex h-[900px]">
      <Sidebar />
      <div
        className="w-[580px] border-r-5 border-l-white"
        style={{ backgroundImage: `url(${Background})` }}
      />
      <div className="flex-none h-full aspect-square " />
      <div
        className="w-[580px] border-l-5 border-l-white"
        style={{ backgroundImage: `url(${Background})` }}
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

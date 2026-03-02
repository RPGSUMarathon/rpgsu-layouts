import { Header } from "../../components/Header/Header";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { ThemeProvider } from "../../components/theme-provider";

const SidebarGB = () => {
  return (
    <div className="flex h-225">
      <Sidebar />
      <div className="w-145 border-r-5 border-l-white" />
      <div className="flex-none h-full aspect-square " />
      <div className="w-145 border-l-5 border-l-white" />
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

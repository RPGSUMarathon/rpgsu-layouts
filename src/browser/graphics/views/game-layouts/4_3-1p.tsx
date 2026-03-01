import { Header } from "../../components/Header/Header";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { ThemeProvider } from "../../components/theme-provider";

export const Center4x3 = () => {
  return (
    <div className="flex h-[890px]">
      <Sidebar />
      <div
        className="flex-1 border-r-5 border-l-white"
      />
      <div className="flex-none h-full aspect-4/3" />
      <div
        className="flex-1 border-l-5 border-l-white"
      />
    </div>
  );
};

export const L4x3_1P = () => {
  return (
    <ThemeProvider>
      <Header />
      <Center4x3 />
    </ThemeProvider>
  );
};

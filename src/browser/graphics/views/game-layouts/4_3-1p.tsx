import { useReplicant } from "@nodecg/react-hooks";
import { Header } from "../../components/Header/Header";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { ThemeProvider } from "../../components/theme-provider";
import backgroundImage from "../../img/online-background.png";

export const Center4x3 = () => {
  const [backgroundToggleOn] = useReplicant<boolean>("backgroundToggleOn", {
    defaultValue: false,
  });
  return (
    <div className="flex h-[890px]">
      <Sidebar />
      <div
        className="flex-1 border-r-5 border-l-white"
        style={{
          backgroundImage: backgroundToggleOn
            ? `url(${backgroundImage})`
            : "none",
        }}
      />
      <div className="flex-none h-full aspect-4/3" />
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

export const L4x3_1P = () => {
  return (
    <ThemeProvider>
      <Header />
      <Center4x3 />
    </ThemeProvider>
  );
};

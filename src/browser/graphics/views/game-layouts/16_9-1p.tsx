import { useReplicant } from "@nodecg/react-hooks";
import { Header } from "../../components/Header/Header";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { ThemeProvider } from "../../components/theme-provider";
import backgroundImage from "../../img/online-background.png";

const Sidebar16x9 = () => {
  const [backgroundToggleOn] = useReplicant<boolean>("backgroundToggleOn", {
    defaultValue: false,
  });
  return (
    <div className="flex h-225 w-full">
      <Sidebar />
      <div className="flex flex-col h-full w-370">
        <div className=" w-full aspect-video" />
        <div
          className="border-t-5 border-t-white w-full h-[70px]"
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
    <ThemeProvider>
      <Header />
      <Sidebar16x9 />
    </ThemeProvider>
  );
};

import { render } from "../../render";
import { HeaderRestream } from "../components/Header/HeaderRestream";
import { ThemeProvider } from "../components/theme-provider";

const Layout3 = () => {
  return (
    <ThemeProvider>
      <HeaderRestream />
    </ThemeProvider>
  );
};

render(<Layout3 />);

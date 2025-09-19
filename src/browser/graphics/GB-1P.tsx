import { render } from '../render';
import { ThemeProvider } from './components/theme-provider';
import {Header} from './components/Header/Header';
import { SidebarContainer } from './components/Sidebar/SidebarContainer';


const Layout = () => {

  return (
    <ThemeProvider>
          <Header />
          <div className={`h-[980px] w-[944px] border-r-3 border-white"`}>
            <SidebarContainer />
          </div>
        </ThemeProvider>
  );
};

render(<Layout />);
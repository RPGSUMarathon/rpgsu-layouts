import { render } from '../render';
import { ThemeProvider } from './components/theme-provider';
import {HeaderRestream} from './components/Header/HeaderRestream';
import {SidebarRestream} from './components/Sidebar/SidebarRestream';


const Layout3 = () => {

  return (
    <ThemeProvider>
        <HeaderRestream />
        <SidebarRestream  />
    </ThemeProvider>
  );
};

render(<Layout3 />);
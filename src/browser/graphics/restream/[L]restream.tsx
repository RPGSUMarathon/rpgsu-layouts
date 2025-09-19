import { render } from '../../render';
import { ThemeProvider } from '../common/theme-provider';
import {HeaderRestream} from '../common/Header/HeaderRestream';
import {SidebarRestream} from './components/SidebarRestream';


const Layout3 = () => {

  return (
    <ThemeProvider>
        <HeaderRestream />
        <SidebarRestream  />
    </ThemeProvider>
  );
};

render(<Layout3 />);
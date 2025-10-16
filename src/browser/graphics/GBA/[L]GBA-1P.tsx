import { render } from '../../render';
import { ThemeProvider } from '../common/theme-provider';
import {Header} from '../common/Header/Header';
import { SidebarGBA } from './components/SidebarGBA';

const Layout2 = () => {

  return (
    <ThemeProvider>
        <Header />
        <SidebarGBA />
    </ThemeProvider>
  );
};

render(<Layout2 />);
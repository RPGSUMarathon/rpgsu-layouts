import { render } from '../../render';
import { ThemeProvider } from '../common/theme-provider';
import {Header} from '../common/Header/Header';
import { SidebarGB } from './components/SidebarGB';

const Layout = () => {

  return (
    <ThemeProvider>
          <Header />
          <SidebarGB />
        </ThemeProvider>
  );
};

render(<Layout />);
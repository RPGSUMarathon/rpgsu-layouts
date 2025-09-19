import { render } from '../../render';
import { ThemeProvider } from '../common/theme-provider';
import {Header} from '../common/Header/Header';
import {Sidebar16x9} from './components/Sidebar16x9';


const Layout2 = () => {

  return (
    <ThemeProvider>
        <Header />
        <Sidebar16x9 />
    </ThemeProvider>
  );
};

render(<Layout2 />);
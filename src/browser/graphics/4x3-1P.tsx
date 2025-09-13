import { render } from '../render';
import { ThemeProvider } from './components/theme-provider';
import {Header} from './components/Header/Header';
import {Sidebar4x3} from './components/Sidebar/Sidebar4x3';


const Layout = () => {

  return (
    <ThemeProvider>
        <Header />
        <Sidebar4x3  />
    </ThemeProvider>
  );
};

render(<Layout />);
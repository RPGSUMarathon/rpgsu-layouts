import { render } from '../render';
import { ThemeProvider } from './components/theme-provider';
import {Header} from './components/Header/Header';
import {Sidebar16x9} from './components/Sidebar/Sidebar16x9';


const Layout2 = () => {

  return (
    <ThemeProvider>
        <Header />
        <Sidebar16x9 widthLength='1448px'  />
    </ThemeProvider>
  );
};

render(<Layout2 />);
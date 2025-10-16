import { render } from '../../render';
import { ThemeProvider } from '../common/theme-provider';
import { Header } from '../common/Header/Header';
import { Sidebar4x3 } from './components/Sidebar4x3';


const Layout = () => {

  return (
    <ThemeProvider>
      <Header />
      <Sidebar4x3 />
    </ThemeProvider>
  );
};

render(<Layout />);
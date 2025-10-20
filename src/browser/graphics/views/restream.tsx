import { render } from '../../render';
import { ThemeProvider } from '../components/theme-provider';
import {HeaderRestream} from '../components/Header/HeaderRestream';


const Layout3 = () => {

  return (
    <ThemeProvider>
        <HeaderRestream />
    </ThemeProvider>
  );
};

render(<Layout3 />);
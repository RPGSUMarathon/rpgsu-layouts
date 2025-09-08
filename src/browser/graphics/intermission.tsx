import { render } from '../render';
import { ThemeProvider } from './components/theme-provider';
import { RotatingImage } from './components/RotatingImage';



const Intermission = () => {
  return (
    <ThemeProvider>
      <RotatingImage />
    </ThemeProvider>
  );
};

render(<Intermission />);

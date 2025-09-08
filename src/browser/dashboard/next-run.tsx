import { DashboardThemeProvider } from './components/DashboardThemeProvider';
import { render } from '../render';

export const App = () => {
  return (
    <DashboardThemeProvider>
        <p className='text-3xl underline'>Next run is this</p>
    </DashboardThemeProvider>
  );
};

render(<App />);

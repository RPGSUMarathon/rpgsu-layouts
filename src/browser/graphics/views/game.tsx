import { render } from '../../render';
import { ThemeProvider } from '../components/theme-provider';
import { useEffect, useState } from 'react';
import * as Layouts from "./game-layouts/index";
import { useReplicant } from '@nodecg/react-hooks';


const layoutMap: Record<string, React.FC> = {
  "4_3-1p": Layouts.L4x3_1P,
  "16_9-1p": Layouts.L16x9_1P,
  "gb-1p": Layouts.Lgb_1P,
  "gba-1p": Layouts.Lgba_1P
};

export function DynamicLayout({ layoutKey }: { layoutKey: string }) {
  const LayoutComponent = layoutMap[layoutKey] ?? Layouts.L4x3_1P;
  return <LayoutComponent />;
}

const App = () => {
  const [layoutKey, setLayoutKey] = useState<string>("16_9-1p");
  const [gameLayout] = useReplicant<string>('currentGameLayout');

  useEffect(() => {
    if (gameLayout) {
      setLayoutKey(gameLayout)
    }
  }, [gameLayout]);

  return (
    <ThemeProvider>
      <DynamicLayout layoutKey={layoutKey} />
    </ThemeProvider>
  );
}

render(<App />)
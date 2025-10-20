import { render } from '../render';
import { DashboardThemeProvider } from './components/DashboardThemeProvider';
import { useReplicant } from '@nodecg/react-hooks';
import { useState, useEffect } from 'react';
import { LayoutInfo } from '@rpgsu-layouts/types/generated/layoutinfo';


export const GameLayoutOverride = () => {
    const [layouts] = useReplicant<LayoutInfo[]>("gameLayouts");
    const [currentGameLayout, setCurrentGameLayout] = useReplicant<string>("currentGameLayout");
    const [currentLayout, setCurrentLayout] = useState("");

    useEffect(() => {
        if (currentGameLayout) {
            const layout = layouts?.find((item) => item.code === currentGameLayout) ?? "";
            setCurrentLayout(layout.name);
        }
    }, [currentGameLayout]);


    return (
        <DashboardThemeProvider>
            <h3>Selected Layout: {currentLayout}</h3>
            <div
                id="dropdown"
                className="z-10 h-45 overflow-y-auto bg-gray-200/80 divide-y divide-gray-100 rounded-lg shadow-sm w-55 dark:bg-gray-700"
            >
                <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                >
                    {layouts?.map((layout) => (
                        <li key={layout.code}>
                            <button
                                className="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => {
                                    setCurrentGameLayout(layout.code);
                                    setCurrentLayout(layout.name);
                                }}
                            >
                                {layout.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </DashboardThemeProvider>
    );
};


render(<GameLayoutOverride />)
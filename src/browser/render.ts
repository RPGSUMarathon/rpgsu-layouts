import { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';

import './graphics/styles.css'
import './dashboard/styles.css'
import '../tailwind.css';


export const render = (app: ReactNode) => {
  const container = document.getElementById('root');
  if (container) {
    createRoot(container).render(app);
  } else {
    throw new Error('#root element not found');
  }
};
import { ReactNode } from 'react';
import "../styles.css";


type Props = {
  children: ReactNode;
};

export const DashboardThemeProvider = ({ children }: Props) => {


  return <div>{children}</div>;
};

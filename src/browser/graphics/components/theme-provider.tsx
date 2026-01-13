import { type ReactNode, Fragment } from 'react';
import "../styles.css";
import background from '../img/online-background.png';

type Props = {
    className?: string,
    children: ReactNode
}

export const ThemeProvider = ({ children, className }:Props) => {
  return (
    <Fragment>
      <div style={{
        margin: 0,
        padding: 0,
        overflow: "hidden",
        color: "white",
        fontFamily: '"Jost",sans-serif, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif',
        display: "flex",
        flexDirection: "column",
        width: "1920px",
        height: "1080px",
        backgroundImage: `url(${background})`
      }} className={className}>
        {children}
      </div>

    </Fragment>
  );
};

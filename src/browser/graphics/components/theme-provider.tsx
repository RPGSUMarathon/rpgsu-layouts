import { type ReactNode, Fragment } from 'react';
import "../styles.css";

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
        fontWeight: "bold",
        fontFamily: 'Futura, "Futura PT", "Avenir Next", Avenir, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif',
        display: "flex",
        flexDirection: "column",
        width: "1920px",
        height: "1080px"
      }} className={className}>
        {children}
      </div>

    </Fragment>
  );
};

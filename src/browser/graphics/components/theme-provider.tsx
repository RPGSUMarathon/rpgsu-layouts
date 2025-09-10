import { type ReactNode, Fragment } from 'react';
import "../styles.css";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
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
      }}>
        {children}
      </div>

    </Fragment>
  );
};

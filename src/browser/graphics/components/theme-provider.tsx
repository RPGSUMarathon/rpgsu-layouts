import { type CSSProperties, type ReactNode } from "react";
import "../styles.css";
type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export const ThemeProvider = ({ children, className, style }: Props) => {
  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        overflow: "hidden",
        color: "white",
        fontFamily:
          '"Jost",sans-serif, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif',
        display: "flex",
        flexDirection: "column",
        width: "1920px",
        height: "1080px",
        ...style,
      }}
      className={className}
    >
      {children}
    </div>
  );
};

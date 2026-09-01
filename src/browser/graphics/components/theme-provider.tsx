import { type CSSProperties, type ReactNode } from "react";
import "../css/offline-theme.css";
import "../css/online-theme.css";
import "../styles.css";
import "../css/animations.css";

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  theme: string;
  world?: string;
};

export const ThemeProvider = ({
  children,
  className,
  style,
  world = "1",
  theme,
}: Props) => {
  return (
    <div
      data-world={world}
      data-theme={theme}
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

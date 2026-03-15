import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import type { ReactNode } from "react";
import { createTheme, ThemeProvider } from "@mui/material";

type Props = {
  children: ReactNode;
};

export const DashboardThemeProvider = ({ children }: Props) => {
  const theme = createTheme({ palette: { mode: "dark" } });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

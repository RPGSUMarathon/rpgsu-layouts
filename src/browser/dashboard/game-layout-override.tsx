import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Paper,
} from "@mui/material";
import { useReplicant } from "@nodecg/react-hooks";
import { useMemo } from "react";
import { type LayoutInfo } from "../../types/generated/layoutinfo";
import { render } from "../render";
import { DashboardThemeProvider } from "./components/DashboardThemeProvider";

export const GameLayoutOverride = () => {
  const [layouts] = useReplicant<LayoutInfo[]>("gameLayouts");
  const typedLayouts = layouts as LayoutInfo[] | undefined;
  const [currentGameLayout, setCurrentGameLayout] =
    useReplicant<string>("currentGameLayout");
  const currentLayout = useMemo(
    () => typedLayouts?.find((item) => item.code === currentGameLayout),
    [currentGameLayout, typedLayouts],
  );

  return (
    <DashboardThemeProvider>
      <Paper
        sx={{ maxHeight: 360, bgcolor: "background.paper", borderRadius: 2 }}
        elevation={2}
      >
        <List
          dense
          subheader={
            <ListSubheader sx={{ borderRadius: 2 }} component="div">
              Selected Layout:{" "}
              {currentLayout ? currentLayout.name : "No Layout"}
            </ListSubheader>
          }
        >
          {typedLayouts?.map((layout) => (
            <ListItem disablePadding key={layout.code}>
              <ListItemButton
                onClick={() => {
                  setCurrentGameLayout(layout.code);
                }}
              >
                <ListItemText primary={layout.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </DashboardThemeProvider>
  );
};

render(<GameLayoutOverride />);

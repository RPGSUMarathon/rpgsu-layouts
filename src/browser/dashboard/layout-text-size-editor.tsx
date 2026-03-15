import { Button, ButtonGroup, Stack } from "@mui/material";
import { useReplicant } from "@nodecg/react-hooks";
import { render } from "../render";
import { DashboardThemeProvider } from "./components/DashboardThemeProvider";

export const LayoutTextSizeEditor = () => {
  const [gameTextSize, setGameTextSize] =
    useReplicant<string>("layoutGameTextSize");
  const [categoryTextSize, setCategoryTextSize] =
    useReplicant<string>("categoryTextSize");
  const [runnerTextSize, setRunnerTextSize] =
    useReplicant<string>("runnerTextSize");
  const [commentatorColumnSize, setCommentatorColumnSize] =
    useReplicant<number>("commentatorColumnSize");

  const textSizes = [
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "3xl",
    "4xl",
    "5xl",
    "6xl",
    "7xl",
  ];
  const columnNumbers = [1, 2];

  return (
    <DashboardThemeProvider>
      <Stack spacing={1}>
        <Button
          onClick={() => {
            setGameTextSize("3xl");
            setCategoryTextSize("3xl");
            setRunnerTextSize("2xl");
            setCommentatorColumnSize(-1);
          }}
          variant="contained"
        >
          Reset
        </Button>
        <h3 className="font-bold">Edit Game Title Size:</h3>
        <div className="inline-flex">
          <ButtonGroup variant="contained">
            {textSizes.map((size) => (
              <Button
                key={`game-${size}`}
                onClick={() => {
                  setGameTextSize(size);
                }}
                color={gameTextSize === size ? "success" : undefined}
              >
                {size}
              </Button>
            ))}
          </ButtonGroup>
        </div>
        <h3 className="font-bold">Edit Category Title Size:</h3>
        <div className="inline-flex">
          <ButtonGroup variant="contained">
            {textSizes.map((size) => (
              <Button
                key={`category-${size}`}
                onClick={() => {
                  setCategoryTextSize(size);
                }}
                color={categoryTextSize === size ? "success" : undefined}
              >
                {size}
              </Button>
            ))}
          </ButtonGroup>
        </div>
        <h3 className="font-bold">Edit Runner Title Size:</h3>
        <div className="inline-flex">
          <ButtonGroup variant="contained">
            {textSizes.map((size) => (
              <Button
                key={`runner-${size}`}
                onClick={() => {
                  setRunnerTextSize(size);
                }}
                color={runnerTextSize === size ? "success" : undefined}
              >
                {size}
              </Button>
            ))}
          </ButtonGroup>
        </div>
        <h3 className="font-bold">Edit Commentator Column:</h3>
        <div className="inline-flex">
          <ButtonGroup variant="contained">
            {columnNumbers.map((size) => (
              <Button
                key={`commentator-${size}`}
                onClick={() => {
                  setCommentatorColumnSize(size);
                }}
                color={commentatorColumnSize === size ? "success" : undefined}
              >
                {size}
              </Button>
            ))}
          </ButtonGroup>
        </div>
      </Stack>
    </DashboardThemeProvider>
  );
};

render(<LayoutTextSizeEditor />);

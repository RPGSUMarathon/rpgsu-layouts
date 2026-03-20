import {
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { useReplicant } from "@nodecg/react-hooks";
import {
  type GenericMessage,
  type OmnibarTickerElement,
} from "@rpgsu-layouts/types";
import {
  type ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FiTrash } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";
import { render } from "../render";
import { DashboardThemeProvider } from "./components/DashboardThemeProvider";

const elementTypeSelectOptions: {
  label: string;
  value: OmnibarTickerElement["type"];
}[] = [
  {
    label: "Generic Message",
    value: "generic-message",
  },
  {
    label: "Next Runs",
    value: "next-run",
  },
];

const numbersOnlyRegex = /^\d+$/;

const OmnibarConfig = () => {
  const [tickerElements, setTickerElements] = useReplicant<
    OmnibarTickerElement[]
  >("tickerElements", { defaultValue: [] });
  const [localTickerElements, setLocalTickerElements] = useState<
    OmnibarTickerElement[]
  >([]);

  const [isAddingNewTickerElement, setIsAddingNewTickerElement] =
    useState(false);
  const [newTickerElementType, setNewTickerElementType] =
    useState<OmnibarTickerElement["type"]>("generic-message");
  const [newTickerElementTimeout, setNewTickerElementTimeout] =
    useState<string>("1000");
  const [newGenericMessageText, setNewGenericMessageText] =
    useState<GenericMessage["message"]>("");

  const saveNewElement = useCallback(() => {
    if (newTickerElementType === "generic-message") {
      const newTickerElement = {
        id: uuidv4(),
        type: newTickerElementType,
        message: newGenericMessageText,
        timeout: parseInt(newTickerElementTimeout),
      };

      setLocalTickerElements([...localTickerElements, newTickerElement]);
    }

    if (newTickerElementType === "next-run") {
      const newTickerElement = {
        id: uuidv4(),
        type: newTickerElementType,
        timeout: parseInt(newTickerElementTimeout),
      };

      setLocalTickerElements([...localTickerElements, newTickerElement]);
    }

    // Reset state to default after saving
    setIsAddingNewTickerElement(false);
    setNewTickerElementType("generic-message");
    setNewGenericMessageText("");
    setNewTickerElementTimeout("1000");
  }, [
    newTickerElementTimeout,
    newTickerElementType,
    newGenericMessageText,
    localTickerElements,
  ]);

  const handleElementTypeChange = useCallback((event: SelectChangeEvent) => {
    setNewTickerElementType(event.target.value as OmnibarTickerElement["type"]);
  }, []);

  const handleNewMessageText = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setNewGenericMessageText(event.target.value);
    },
    [],
  );

  const handleNewElementTimeout = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setNewTickerElementTimeout(event.target.value);
    },
    [],
  );

  const timeoutOnlyIncludesNumbers = useMemo(
    () => numbersOnlyRegex.test(newTickerElementTimeout),
    [newTickerElementTimeout],
  );

  const saveLocalChangesToReplicant = useCallback(() => {
    setTickerElements(localTickerElements);
  }, [localTickerElements, setTickerElements]);

  const removeElement = (id: string) => {
    const elementsWithoutRemoved = [...localTickerElements].filter(
      (element) => element.id !== id,
    );

    setLocalTickerElements(elementsWithoutRemoved);
  };

  useEffect(() => {
    if (typeof tickerElements === "undefined") return;

    // this is needed for the sync logic between the local version and replicant version, so here's an ugly lint rule disable :)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalTickerElements(tickerElements);
  }, [tickerElements]);

  const hasPendingChanges = useMemo(
    () => localTickerElements !== tickerElements,
    [localTickerElements, tickerElements],
  );

  return (
    <DashboardThemeProvider>
      <Stack padding={1} gap={2}>
        <Button
          variant="contained"
          disabled={!hasPendingChanges}
          onClick={saveLocalChangesToReplicant}
        >
          Save changes
        </Button>
        {!isAddingNewTickerElement && (
          <Button
            onClick={() => setIsAddingNewTickerElement(true)}
            variant="contained"
          >
            Add new ticker element
          </Button>
        )}

        {/** New element form */}
        {isAddingNewTickerElement && (
          <>
            <Divider />

            {/** Element type */}
            <FormControl>
              <InputLabel id="element-type-select-label">
                Element type
              </InputLabel>
              <Select
                labelId="element-type-select-label"
                label="Element type"
                value={newTickerElementType}
                onChange={handleElementTypeChange}
              >
                {elementTypeSelectOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/** Message Text */}
            {newTickerElementType === "generic-message" && (
              <TextField
                label="Message"
                value={newGenericMessageText}
                onChange={handleNewMessageText}
              />
            )}

            {/** Timeout */}
            <TextField
              label="Element time length (in milliseconds)"
              value={newTickerElementTimeout}
              onChange={handleNewElementTimeout}
              error={!timeoutOnlyIncludesNumbers}
              helperText={
                timeoutOnlyIncludesNumbers
                  ? ""
                  : "This field should only include numbers!"
              }
            />

            <Button
              variant="contained"
              disabled={!timeoutOnlyIncludesNumbers}
              onClick={saveNewElement}
            >
              Save new element
            </Button>
          </>
        )}

        <Divider />
        {localTickerElements.map((element, _index) => (
          <Grid
            key={element.id}
            container
            direction="row"
            sx={{ justifyContent: "space-between" }}
            spacing={2}
          >
            <Grid>
              <Stack>
                <span>
                  <b>Type: </b>
                  {element.type}
                </span>
                {element.type === "generic-message" && (
                  <span>
                    <b>Message: </b>
                    {element.message}
                  </span>
                )}
                <span>
                  <b>Length: </b> {element.timeout} ms
                </span>
              </Stack>
            </Grid>
            <Grid>
              <Tooltip title="Delete">
                <Button
                  sx={{ height: "100%" }}
                  variant="contained"
                  onClick={() => removeElement(element.id)}
                >
                  <FiTrash />
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        ))}
      </Stack>
    </DashboardThemeProvider>
  );
};

render(<OmnibarConfig />);

import type React from "react";
import {
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useReplicant } from "@nodecg/react-hooks";
import { useState } from "react";
import {
  FiCamera,
  FiCameraOff,
  FiCheck,
  FiEdit,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import { type Channel } from "../../types/custom/channel";
import { type Commentator } from "../../types/custom/commentators";
import Bluesky from "../graphics/img/icons/bluesky.png";
import Twitch from "../graphics/img/icons/twitch.png";
import { render } from "../render";
import { DashboardThemeProvider } from "./components/DashboardThemeProvider";

export const channels: Channel[] = [
  "",
  "Game PC",
  "Game PC",
  "Console",
  "Console",
  "Runner 1",
  "Comm 1",
  "Comm 2",
  "Comm 3",
  "Tech",
  "Loose Mic",
  "",
  "",
  "Playlist",
  "",
  "",
  "Videos",
];

const CameraDashboard: React.FC = () => {
  const [nameInput, setNameInput] = useState<string>("");
  const [editingItem, setEditingItem] = useState<number | null>(null);
  const [editName, setEditName] = useState<string>("");
  const [editPronouns, setEditPronouns] = useState<string>("");
  const [cameraOn, setCameraOn] = useReplicant<boolean>("cameraOn", {
    defaultValue: true,
  });
  const [editTwitch, setEditTwitch] = useState<string>("");
  const [editBluesky, setEditBluesky] = useState<string>("");
  const [channelInput, setChannelInput] = useState<Channel>("");
  const [editChannel, setEditChannel] = useState<Channel>("");
  const [commentators, setCommentators] = useReplicant<Commentator[]>(
    "commentators",
    { defaultValue: [] },
  );

  const handleAddItem = (): void => {
    if (nameInput.trim() === "") return;

    const newItem: Commentator = {
      id: Date.now(),
      name: nameInput,
      pronouns: "",
      twitch: "",
      bluesky: "",
      channel: channelInput,
    };

    setCommentators([...(commentators ?? []), newItem]);
    setNameInput("");
    setChannelInput("");
  };

  const handleDeleteItem = (id: number): void => {
    if (commentators == null) return;
    setCommentators(commentators.filter((item) => item.id !== id));
    if (editingItem === id) {
      setEditingItem(null);
    }
  };

  const handleStartEdit = (item: Commentator): void => {
    setEditingItem(item.id);
    setEditName(item.name);
    setEditPronouns(item.pronouns ?? "");
    setEditTwitch(item.twitch ?? "");
    setEditBluesky(item.bluesky ?? "");
    setEditChannel(item.channel ?? "");
  };

  const handleSaveEdit = (): void => {
    if (commentators == null) return;

    setCommentators(
      commentators.map((item) =>
        item.id === editingItem
          ? {
              ...item,
              name: editName,
              pronouns: editPronouns,
              twitch: editTwitch.trim(),
              bluesky: editBluesky.trim(),
              channel: editChannel,
            }
          : item,
      ),
    );

    setEditingItem(null);
  };

  const handleCancelEdit = (): void => {
    setEditingItem(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleAddItem();
    }
  };

  return (
    <DashboardThemeProvider>
      <Stack spacing={2}>
        {/* Camera Toggle */}
        <div className="inline-flex items-center justify-between">
          <span className="text-lg font-semibold">Camera Settings:</span>
          <span className="text-md">
            {cameraOn ? "Camera On" : "Camera Off"}
          </span>
          <Button
            onClick={() => setCameraOn(!cameraOn)}
            color={cameraOn ? "success" : undefined}
            variant="contained"
          >
            {cameraOn ? <FiCamera /> : <FiCameraOff />}
          </Button>
        </div>
        <Divider />
        <h2 className="text-lg font-bold">Commentators:</h2>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Stack spacing={2}>
            <Grid
              container
              spacing={2}
              direction="row"
              sx={{ justifyContent: "space-between" }}
            >
              <Grid container spacing={2}>
                <Grid>
                  <TextField
                    fullWidth
                    placeholder="Enter name"
                    label="Commentator name"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setNameInput(e.target.value);
                    }}
                    onKeyDown={handleKeyPress}
                  />
                </Grid>

                <Grid>
                  <FormControl sx={{ minWidth: 160 }}>
                    <InputLabel id="channel-select-label">Channel</InputLabel>
                    <Select
                      labelId="channel-select-label"
                      value={channelInput}
                      label="Channel"
                      onChange={(e) => {
                        setChannelInput(e.target.value as Channel);
                      }}
                    >
                      {channels.map((channel) => (
                        <MenuItem key={channel ?? "none"} value={channel}>
                          {channel ?? "None"}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid>
                  <Button
                    variant="contained"
                    sx={{ height: "100%" }}
                    disabled={nameInput.trim() === ""}
                    onClick={handleAddItem}
                  >
                    <FiCheck size={24} />
                  </Button>
                </Grid>
              </Grid>
              <Grid>
                <Button
                  variant="contained"
                  sx={{ height: "100%" }}
                  disabled={nameInput.trim() === ""}
                  onClick={handleAddItem}
                >
                  <FiCheck size={24} />
                </Button>
              </Grid>
            </Grid>
            <Divider>CURRENT COMMENTATORS</Divider>
            <List>
              {commentators &&
                commentators.map((commentator) => (
                  <ListItem key={commentator.id}>
                    <Paper
                      variant="outlined"
                      sx={{ width: "100%", padding: "15px" }}
                    >
                      {editingItem === commentator.id ? (
                        <Stack spacing={2}>
                          <Grid container spacing={2}>
                            <Grid>
                              <TextField
                                placeholder="Edit name"
                                label="Commentator name"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                              />
                            </Grid>

                            <Grid>
                              <Stack spacing={1}>
                                <Button
                                  onClick={handleSaveEdit}
                                  variant="contained"
                                >
                                  <FiCheck />
                                </Button>

                                <Button
                                  onClick={handleCancelEdit}
                                  variant="contained"
                                >
                                  <FiX />
                                </Button>
                              </Stack>
                            </Grid>
                          </Grid>

                          <FormControl fullWidth>
                            <InputLabel id="edit-channel-select-label">
                              Channel
                            </InputLabel>
                            <Select
                              labelId="edit-channel-select-label"
                              value={editChannel}
                              label="Channel"
                              onChange={(e) => {
                                setEditChannel(e.target.value as Channel);
                              }}
                            >
                              {channels.map((channel) => (
                                <MenuItem
                                  key={channel ?? "none"}
                                  value={channel}
                                >
                                  {channel ?? "None"}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>

                          <TextField
                            value={editPronouns}
                            onChange={(e) => setEditPronouns(e.target.value)}
                            label="Pronouns"
                          />

                          <TextField
                            value={editTwitch}
                            onChange={(e) => setEditTwitch(e.target.value)}
                            label="Twitch"
                          />

                          <TextField
                            value={editBluesky}
                            onChange={(e) => setEditBluesky(e.target.value)}
                            label="Bluesky"
                          />
                        </Stack>
                      ) : (
                        <Grid
                          container
                          direction="row"
                          sx={{ justifyContent: "space-between" }}
                          spacing={2}
                        >
                          <Grid>
                            <Stack spacing={1}>
                              <div>
                                {commentator.name}{" "}
                                <Typography
                                  color="textDisabled"
                                  component="span"
                                >
                                  ({commentator.pronouns})
                                </Typography>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  gap: "8px",
                                }}
                              >
                                {commentator.twitch && (
                                  <img
                                    className="h-4"
                                    src={Twitch}
                                    alt="Twitch"
                                  />
                                )}
                                {commentator.bluesky && (
                                  <img
                                    className="h-4"
                                    src={Bluesky}
                                    alt="Bluesky"
                                  />
                                )}
                              </div>
                            </Stack>
                          </Grid>
                          <Grid container gap={2}>
                            <Grid>
                              <Button
                                variant="contained"
                                onClick={() => handleStartEdit(commentator)}
                              >
                                <FiEdit />
                              </Button>
                            </Grid>
                            <Grid>
                              <Button
                                onClick={() => handleDeleteItem(commentator.id)}
                                variant="contained"
                              >
                                <FiTrash2 />
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      )}
                    </Paper>
                  </ListItem>
                ))}
            </List>
          </Stack>
        </Paper>
      </Stack>
    </DashboardThemeProvider>
  );
};

render(<CameraDashboard />);

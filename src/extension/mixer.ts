import OSC from "osc-js";
import { get } from "./util/nodecg";
import { TaggedLogger } from "./util/tagged-logger";

const log = new TaggedLogger("mixer");
const nodecg = get();
const config = nodecg.bundleConfig.mixer;

const channelIdToName = {
  "1": "Game PC",
  "3": "Console",
  "5": "Runner 1",
  "6": "Comm 1",
  "7": "Comm 2",
  "8": "Comm 3",
  "9": "Tech",
  "10": "Loose Mic",
  "11": "Playlist",
};
const channelNameToId = Object.entries(channelIdToName).reduce(
  (acc, [id, name]) => {
    acc[name] = id;
    return acc;
  },
  {} as Record<string, string>,
);

const osc = new OSC({
  plugin: new OSC.DatagramPlugin({
    type: "udp4",
    open: {
      host: "0.0.0.0",
      port: 41235,
      exclusive: true,
    },
    send: {
      host: config.address,
      port: config.port,
    },
  }),
});

log.info(`Connecting to Mixer`);
osc.open();

osc.on("open", function () {
  const xinfo = new OSC.Message("/xinfo");
  osc!.send(xinfo);
});

osc.on("error", (message: any) => {
  log.error(message);
});

osc.on("/xinfo", function (message: any) {
  log.info(`Connected to mixer: ${message.args}`);
});

nodecg.listenFor("testmute", () => {
  log.info(`Heard message. Muting now`);
  onIntermission();
});

function muteChannel(channelName: string, mute: boolean) {
  const channelId = channelNameToId[channelName];
  if (channelId == undefined) {
    log.error(`Can't find channel ${channelName}`);
    return;
  }
  const padded = String(channelId).padStart(2, "0");
  const muteValue = mute ? 0 : 1;

  const command = new OSC.Message(`/ch/${padded}/mix/on`, muteValue);
  log.debug(`Muting ${channelName} (${padded})`);
  osc!.send(command);
}

function onIntermission() {
  const channelsToMute = [
    "Game PC",
    "Console",
    "Runner 1",
    "Comm 1",
    "Comm 2",
    "Comm 3",
    "Tech",
    "Loose Mic",
  ];
  for (const channelName of channelsToMute) {
    muteChannel(channelName, true);
  }
  muteChannel("Playlist", false);
}

function onGame() {
  const channelsToUnmute = [
    "Game PC",
    "Console",
    "Runner 1",
    "Comm 1",
    "Comm 2",
    "Comm 3",
  ];
  for (const channelName of channelsToUnmute) {
    muteChannel(channelName, false);
  }
  muteChannel("Playlist", true);
}

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

if (config?.enabled) {
  const settings = {
    type: "udp4",
    open: {
      host: "0.0.0.0",
      port: 41234,
      exclusive: true,
    },
    send: {
      host: config.address,
      port: config.port,
    },
  };
  const osc = new OSC({
    plugin: new OSC.DatagramPlugin(settings),
  });

  log.info(`Connecting to Mixer`);
  osc.open();

  osc.on("open", function () {
    const xinfo = new OSC.Message("/xinfo");
    osc!.send(xinfo);
  });

  osc.on("error", (message: never) => {
    log.error(message);
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  osc.on("/xinfo", function (message: any) {
    log.info(`Connected to mixer: ${message.args}`);
  });

  function muteChannel(channelName: string, mute: boolean) {
    const channelId = channelNameToId[channelName];
    if (channelId === undefined) {
      log.error(`Can't find channel ${channelName}`);
      return;
    }
    const padded = String(channelId).padStart(2, "0");
    const muteValue = mute ? 0 : 1;

    const command = new OSC.Message(`/ch/${padded}/mix/on`, muteValue);
    log.debug(`Muting ${channelName} (${padded})`);
    osc!.send(command);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  function onIntermissionDCA() {
    log.debug(`Muting LIVE DCA, unmuting Playlist DCA`);
    osc!.send(new OSC.Message(`/dca/1/mix/on`, false));
    osc!.send(new OSC.Message(`/dca/2/mix/on`, true));
  }

  function onGameDCA() {
    log.debug(`Muting Playlist DCA, unmuting LIVE DCA`);
    osc!.send(new OSC.Message(`/dca/1/mix/on`, true));
    osc!.send(new OSC.Message(`/dca/2/mix/on`, false));
  }

  nodecg.listenFor("switchToIntermissionWithAnimation", () => {
    log.info(`Muting channels going into intermission`);
    onIntermissionDCA();
  });

  nodecg.listenFor("switchToGame", () => {
    log.info(`Unmuting channels going into game`);
    onGameDCA();
  });
}

import { type Channel } from "@rpgsu-layouts/types/custom/channel";
//Thank you to Gramy Szybko, Pomagamy Skutecznie, who figured out most of this code. Credit goes to them.
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
  "16": "Videos",
};
const channelNameToId = Object.entries(channelIdToName).reduce(
  (acc, [id, name]) => {
    acc[name] = id;
    return acc;
  },
  {} as Record<string, string>,
);

const mixerSignalLevels = nodecg.Replicant<{
  [key in keyof typeof channelNameToId]: number;
}>("mixerSignalLevels", {
  defaultValue: Object.keys(channelNameToId).reduce(
    (acc, name) => {
      acc[name] = -Infinity;
      return acc;
    },
    { "": -Infinity } as Record<string, number>,
  ),
});

function meterToDb(v: number): number {
  return v / 256;
}

nodecg.Replicant<{ [key in keyof typeof channelNameToId]: number }>(
  "mixerThresholdLevels",
  {
    defaultValue: Object.keys(channelNameToId).reduce(
      (acc, name) => {
        acc[name] = -30;
        return acc;
      },
      { "": +Infinity } as Record<string, number>,
    ),
  },
);

let lastMetersUpdate = 0;

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

  function scheduleMeters() {
    const meters = new OSC.Message("/meters", "/meters/2");
    osc!.send(meters);

    setInterval(() => {
      if (Date.now() - lastMetersUpdate > 10000) {
        osc!.send(meters);
        log.debug("re-requesting meters");
      } else {
        const renewMeters = new OSC.Message("/renew", "/meters/2");
        log.debug("renewing meters");
        osc!.send(renewMeters);
      }
    }, 2000);
  }

  log.info(`Connecting to Mixer`);
  osc.open();

  osc.on("open", function () {
    const xinfo = new OSC.Message("/xinfo");
    osc!.send(xinfo);

    scheduleMeters();
  });

  osc.on("error", (message: never) => {
    log.error(message);
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  osc.on("/xinfo", function (message: any) {
    log.info(`Connected to mixer: ${message.args}`);
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  osc.on("/meters/2", (message: any) => {
    const u8Array = message.args[0];
    const buffer = new DataView(
      u8Array.buffer,
      u8Array.byteOffset,
      u8Array.byteLength,
    );
    const i16Array = [];
    for (let i = 4; i < buffer.byteLength; i += 2) {
      i16Array.push(buffer.getInt16(i, true));
    }
    const analogIn = i16Array.slice(0, 16).map(meterToDb);
    for (const [i, v] of analogIn.entries()) {
      const channelId = (i + 1).toString();
      const inputName =
        channelIdToName[channelId as keyof typeof channelIdToName] || channelId;
      if (inputName !== channelId) {
        mixerSignalLevels.value![inputName as Channel] = v;
      }
    }
    lastMetersUpdate = Date.now();
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  osc.on("*", function (message: any) {
    if (message.address.startsWith("/meters")) {
      return;
    }
    log.debug(`catchall: ${message.address} ${message.args}`);
  });

  // function muteChannel(channelName: string, mute: boolean) {
  //   const channelId = channelNameToId[channelName];
  //   if (channelId === undefined) {
  //     log.error(`Can't find channel ${channelName}`);
  //     return;
  //   }
  //   const padded = String(channelId).padStart(2, "0");
  //   const muteValue = mute ? 0 : 1;

  //   const command = new OSC.Message(`/ch/${padded}/mix/on`, muteValue);
  //   log.debug(`Muting ${channelName} (${padded})`);
  //   osc!.send(command);
  // }

  // function onIntermission() {
  //   const channelsToMute = [
  //     "Game PC",
  //     "Console",
  //     "Runner 1",
  //     "Comm 1",
  //     "Comm 2",
  //     "Comm 3",
  //     "Tech",
  //     "Loose Mic",
  //   ];
  //   for (const channelName of channelsToMute) {
  //     muteChannel(channelName, true);
  //   }
  //   muteChannel("Playlist", false);
  // }

  // function onGame() {
  //   const channelsToUnmute = [
  //     "Game PC",
  //     "Console",
  //     "Runner 1",
  //     "Comm 1",
  //     "Comm 2",
  //     "Comm 3",
  //   ];
  //   for (const channelName of channelsToUnmute) {
  //     muteChannel(channelName, false);
  //   }
  //   muteChannel("Playlist", true);
  // }

  function onIntermissionDCA() {
    log.debug(`Muting LIVE DCA, unmuting Playlist DCA`);
    osc!.send(new OSC.Message(`/dca/1/fader`, 0));
    osc!.send(new OSC.Message(`/dca/2/fader`, 0.75));
    osc!.send(new OSC.Message(`/dca/3/fader`, 0));
  }

  function onGameDCA() {
    log.debug(`Muting Playlist DCA, unmuting LIVE DCA`);
    osc!.send(new OSC.Message(`/dca/1/fader`, 0.75));
    osc!.send(new OSC.Message(`/dca/2/fader`, 0));
    osc!.send(new OSC.Message(`/dca/3/fader`, 0));
  }

  function onCutsceneDCA() {
    log.debug(`Muting everything to play audio from OBS for videos`);
    osc!.send(new OSC.Message(`/dca/1/fader`, 0));
    osc!.send(new OSC.Message(`/dca/2/fader`, 0));
    osc!.send(new OSC.Message(`/dca/3/fader`, 0.75));
  }

  nodecg.listenFor("switchToIntermissionWithAnimation", () => {
    log.info(`Muting channels going into intermission`);
    onIntermissionDCA();
  });

  nodecg.listenFor("switchToGame", () => {
    log.info(`Unmuting channels going into game`);
    onGameDCA();
  });

  nodecg.listenFor("switchToCutscene", () => {
    log.info(`Muting channels going into cutscene`);
    onCutsceneDCA();
  });
}

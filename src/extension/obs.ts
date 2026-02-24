import { get } from "./util/nodecg";
import { OBSUtility } from "./util/obs-util";

const nodecg = get();
const obs = new OBSUtility();
const config = nodecg.bundleConfig.obs;

if (config.enabled) {
  obs.connectToOBS();

  obs.on("ConnectionClosed", () => {
    obs.log.warn(
      "Disconnected from OBS! Attempting to reconnect in 5 seconds...",
    );
    setTimeout(() => obs.connectToOBS(), 5000);
  });

  nodecg.listenFor("switchToIntermission", () => {
    if (obs.currentScene === config.scenes!.intermission) return;

    console.log("Changing to intermission");

    void obs.changeToIntermission().then(() => {
      nodecg.sendMessageToBundle("changeToNextRun", "nodecg-speedcontrol");
      nodecg.sendMessageToBundle(
        "playbackStart",
        "nodecg-foobar2000-controller",
      );
    });
  });

  nodecg.listenFor("switchToEnding", () => {
    if (obs.currentScene === config.scenes!.ending) return;

    console.log("Changing to ending");

    void obs.changeToEnding().then(() => {
      nodecg.sendMessageToBundle("changeToNextRun", "nodecg-speedcontrol");
      nodecg.sendMessageToBundle(
        "playbackStart",
        "nodecg-foobar2000-controller",
      );
    });
  });
}

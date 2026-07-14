import { get } from "./util/nodecg";
import { OBSUtility } from "./util/obs-util";
import { bossDefeatedAnimation } from "./util/replicants";

const nodecg = get();
const obs = new OBSUtility();
const config = nodecg.bundleConfig.obs;

const worlds = [
  { id: "1", label: "Forest" },
  { id: "2", label: "Snow" },
  { id: "3", label: "Volcano" },
  { id: "4", label: "Desert" },
];

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

  nodecg.listenFor("switchToIntermissionWithAnimation", () => {
    if (obs.currentScene === config.scenes!.intermission) return;

    console.log("Changing to intermission with animation");

    void obs.changeToIntermission().then(() => {
      // nodecg.sendMessageToBundle(
      //   "playbackStart",
      //   "nodecg-foobar2000-controller",
      // );
      setTimeout(() => {
        bossDefeatedAnimation.value = true;

        setTimeout(() => {
          bossDefeatedAnimation.value = false;
          nodecg.sendMessageToBundle("changeToNextRun", "nodecg-speedcontrol");
        }, 2000);
      }, 8000);
    });
  });

  nodecg.listenFor("switchToNextWorld", (value) => {
    console.log(`Changing to cutscene for World ${value}.`);

    void obs.changeToNextWorld(value).then(() => {
      //Needs to advance twice, once to skip the world, other to go to the run. Probably smarter way to do this lol
      nodecg.sendMessageToBundle("changeToNextRun", "nodecg-speedcontrol");
      nodecg.sendMessageToBundle(
        "playbackStart",
        "nodecg-foobar2000-controller",
      );
      nodecg.sendMessageToBundle("changeToNextRun", "nodecg-speedcontrol");
    });
  });

  nodecg.listenFor("overrideWorld", (value) => {
    console.log(`Overriding World to ${value}.`);
    void obs.changeSource("Animation", value);
  });
}

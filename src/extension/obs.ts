import { type LayoutGamePosition } from "@rpgsu-layouts/types/custom/layoutinfo";
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

const sourcePos: LayoutGamePosition[] = [
  {
    layout: "4_3-1p",
    screenNumber: 1,
    position: [
      {
        name: "Capture",
        positionX: 591.5,
        positionY: 130,
        width: 1187,
        height: 890,
      },
    ],
  },
  {
    layout: "16_9-1p",
    screenNumber: 1,
    position: [
      {
        name: "Capture",
        positionX: 450,
        positionY: 130,
        width: 1470,
        height: 890,
      },
    ],
  },
  {
    layout: "gb-1p",
    screenNumber: 1,
    position: [
      {
        name: "Capture",
        positionX: 740,
        positionY: 130,
        width: 890,
        height: 890,
      },
    ],
  },
  {
    layout: "gba-1p",
    screenNumber: 1,
    position: [
      {
        name: "Capture",
        positionX: 517.5,
        positionY: 130,
        width: 1335,
        height: 890,
      },
    ],
  },
  {
    layout: "ds-1p",
    screenNumber: 2,
    position: [
      {
        name: "Capture",
        positionX: 591.5,
        positionY: 130,
        width: 1187,
        height: 890,
      },
      {
        name: "Capture-2",
        positionX: 0,
        positionY: 683,
        width: 450,
        height: 337.5,
      },
    ],
  },
  {
    layout: "3ds-1p",
    screenNumber: 2,
    position: [
      {
        name: "Capture",
        positionX: 450,
        positionY: 130,
        width: 1470,
        height: 890,
      },
      {
        name: "Capture-2",
        positionX: 0,
        positionY: 683,
        width: 450,
        height: 337.5,
      },
    ],
  },
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

    //Updating animation - if somehow the array returns an invalid world, it *will* crash the layouts
    void obs.changeSource("Animation", worlds[value]?.label ?? "Forest");

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

  /**
   @todo: Update Source Position
    Will move the game source (and th camera if applied) to the correct position depending on the layout.
    Also reset the cropping.
  **/

  nodecg.listenFor("updateSourcePosition", (value) => {
    console.log(`Next layout ${value}`);
    const layoutGamePosition = sourcePos.find((lgp) => lgp.layout === value);
    if (layoutGamePosition != null) {
      for (let i = 0; i < layoutGamePosition.screenNumber; i++) {
        void obs.updateSourcePosition(layoutGamePosition!.position[i]!);
      }
    }
  });
}

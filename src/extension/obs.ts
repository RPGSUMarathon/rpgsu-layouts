import { type LayoutGamePosition } from "@rpgsu-layouts/types/custom/layoutinfo";
import { get } from "./util/nodecg";
import { OBSUtility } from "./util/obs-util";

const nodecg = get();
const obs = new OBSUtility();
const config = nodecg.bundleConfig.obs;

const worlds = [
  { id: "1", label: "Forest", tiName: "Forest TI" },
  { id: "2", label: "Snow", tiName: "Snow TI" },
  { id: "3", label: "Volcano", tiName: "Volcano TI" },
  { id: "4", label: "Desert", tiName: "Desert TI" },
];

const sourcePos: LayoutGamePosition[] = [
  {
    layout: "4_3-1p",
    screenNumber: 1,
    position: [
      {
        name: "Capture",
        positionX: 599,
        positionY: 135,
        width: 1179,
        height: 883,
      },
    ],
  },
  {
    layout: "16_9-1p",
    screenNumber: 1,
    position: [
      {
        name: "Capture",
        positionX: 459,
        positionY: 135,
        width: 1461,
        height: 818,
      },
    ],
  },
  {
    layout: "gb-1p",
    screenNumber: 1,
    position: [
      {
        name: "Capture",
        positionX: 742,
        positionY: 135,
        width: 893,
        height: 885,
      },
    ],
  },
  {
    layout: "gba-1p",
    screenNumber: 1,
    position: [
      {
        name: "Capture",
        positionX: 459,
        positionY: 135,
        width: 1343,
        height: 885,
      },
    ],
  },
  {
    layout: "ds-1p",
    screenNumber: 2,
    position: [
      {
        name: "Capture",
        positionX: 597,
        positionY: 135,
        width: 1179,
        height: 883,
      },
      {
        name: "Capture-2",
        positionX: 0,
        positionY: 688,
        width: 450,
        height: 333,
      },
    ],
  },
  {
    layout: "3ds-1p",
    screenNumber: 2,
    position: [
      {
        name: "Capture",
        positionX: 455,
        positionY: 135,
        width: 1466,
        height: 885,
      },
      {
        name: "Capture-2",
        positionX: 0,
        positionY: 688,
        width: 450,
        height: 333,
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

  nodecg.listenFor("switchToGame", () => {
    if (obs.currentScene === config.scenes!.game) return;

    console.log("Changing to game");

    void obs.changeToGame().then(() => {
      nodecg.sendMessageToBundle(
        "playbackStop",
        "nodecg-foobar2000-controller",
      );
    });
  });

  nodecg.listenFor("switchToIntermissionWithAnimation", () => {
    if (obs.currentScene === config.scenes!.intermission) return;

    console.log("Changing to intermission with animation");

    void obs.changeToIntermission().then(() => {
      nodecg.sendMessageToBundle(
        "playbackStart",
        "nodecg-foobar2000-controller",
      );
    });
  });

  nodecg.listenFor("switchToCutscene", (value) => {
    console.log(`Changing to cutscene ${value}.`);
    void obs.changeScene(value);

    // Ary and Elly walking animation is replaced for fighting scene
    if (value === "Cutscene 6") {
      void obs.changeSource(
        "Characters Animation",
        "Ary, Elly and Sumio",
        true,
      );
      void obs.changeSource(
        "Characters Animation",
        "Ary and Elly Walking Left",
        false,
      );
      void obs.changeSource(
        "Characters Animation",
        "Ary and Cat Elly Running",
        false,
      );

      void obs.changeSource("Animation", "Desert", false);
      void obs.changeSource("Animation", "Fight", true);
    }

    // Ary and Elly walking animation is replaced for walking back
    if (value === "Cutscene 7") {
      void obs.changeSource(
        "Characters Animation",
        "Ary, Elly and Sumio",
        false,
      );
      void obs.changeSource(
        "Characters Animation",
        "Ary and Elly Walking Left",
        true,
      );
      void obs.changeSource(
        "Characters Animation",
        "Ary and Cat Elly Running",
        false,
      );

      void obs.changeSource("Animation", "Fight", false);
      void obs.changeSource("Animation", "Desert Reversed", true);
    }
  });

  nodecg.listenFor("switchToTechIssues", () => {
    void obs.changeScene("Tech Issues").then(() => {
      nodecg.sendMessageToBundle(
        "playbackStart",
        "nodecg-foobar2000-controller",
      );
    });
  });

  nodecg.listenFor("switchToNextWorld", (value) => {
    const nextWorld = worlds.find((world) => world.id === value);

    console.log(`Changing to World ${value}: ${nextWorld?.label}.`);

    void obs.changeSource("Animation", nextWorld?.label ?? "Forest", true);

    void obs.changeSource(
      "Tech Issues",
      nextWorld?.tiName ?? "Forest TI",
      true,
    );

    worlds.forEach((world) => {
      if (world.label !== nextWorld?.label) {
        void obs.changeSource("Animation", world.label, false);
        void obs.changeSource(
          "Tech Issues",
          world.tiName ?? "Forest TI",
          false,
        );
      }
    });
  });

  nodecg.listenFor("overrideWorld", (value) => {
    console.log(`Overriding World to ${value}.`);
    void obs.changeSource("Animation", value, true);

    worlds.forEach((world) => {
      if (world.label !== value) {
        void obs.changeSource("Animation", world.label, false);
      }
    });
  });

  nodecg.listenFor("updateSourcePosition", (value) => {
    console.log(`Next layout ${value}`);
    const layoutGamePosition = sourcePos.find((lgp) => lgp.layout === value);
    if (layoutGamePosition != null) {
      for (let i = 0; i < layoutGamePosition.screenNumber; i++) {
        void obs.updateSourcePosition(layoutGamePosition!.position[i]!);
      }
    }
  });

  nodecg.listenFor("resetCameraPosition", () => {
    console.log(`Resetting camera position.`);
    void obs.updateSourcePosition({
      name: "Camera",
      positionX: 5,
      positionY: 133,
      width: 445,
      height: 333,
    });
  });
}

import { type SourcePosition } from "@rpgsu-layouts/types";
import obsWebsocketJs from "obs-websocket-js";
import { get } from "./nodecg";
import {
  bossDefeatedAnimation,
  commentators,
  currentOBSScene,
} from "./replicants";
import { TaggedLogger } from "./tagged-logger";

const nodecg = get();

export class OBSUtility extends obsWebsocketJs {
  config = nodecg.bundleConfig.obs;
  connected = false;
  isRecording = false;
  currentScene = "";
  private currentSceneReplicant = currentOBSScene;
  log = new TaggedLogger("obs");

  constructor() {
    super();

    this.currentSceneReplicant.on("change", (newVal: string | undefined) => {
      this.currentScene = newVal ?? "";
    });

    this.on("ConnectionClosed", () => {
      this.connected = false;
    });

    this.on("CurrentProgramSceneChanged", (data) => {
      if (data.sceneName === this.currentScene) return;

      this.currentSceneReplicant.value = data.sceneName;
    });

    this.on("SceneTransitionVideoEnded", (data) => {
      if (data.transitionName === "ToIntermission") {
        bossDefeatedAnimation.value = true;

        setTimeout(() => {
          bossDefeatedAnimation.value = false;
          nodecg.sendMessageToBundle("changeToNextRun", "nodecg-speedcontrol");
        }, 2000);
      }
    });
  }

  /** Connects to OBS if enabled in config. */
  connectToOBS() {
    if (!this.config.enabled) {
      this.log.warn("OBS integration disabled in config, not connecting!");
      return;
    }

    this.log.info("Setting up OBS connection.");
    this.connect(this.config.url, this.config.password)
      .then(() => {
        this.log.info("Connected to OBS!");
        this.connected = true;
        void this.checkIfRecording();
      })
      .catch((err) => {
        this.log.warn("OBS connection error.");
        this.log.debug("OBS connection error:", err);
      });
  }

  /**
   * Change to this OBS scene.
   * @param name Name of the scene.
   */
  async changeScene(name: string): Promise<void> {
    try {
      await this.call("SetCurrentProgramScene", { sceneName: name });
    } catch (err) {
      this.log.warn(`Cannot change OBS scene [${name}]: ${err}`);
      throw err;
    }
  }

  /**
   * Change to this OBS scene.
   * @param sceneName Name of the scene.
   */
  async changeSource(sceneName: string, sourceName: string): Promise<void> {
    try {
      const { sceneItemId } = await this.call("GetSceneItemId", {
        sceneName,
        sourceName,
      });

      console.log(`scene item id ${sceneItemId}.`);

      await this.call("SetSceneItemEnabled", {
        sceneName,
        sceneItemId,
        sceneItemEnabled: true,
      });
    } catch (err) {
      this.log.warn(`Cannot change OBS source [${sourceName}]: ${err}`);
      throw err;
    }
  }

  /**
   * Change to this OBS scene.
   * @param cutscene Name of cutscene to be played
   */
  async changeToNextWorld(cutscene: string) {
    try {
      await this.call("SetCurrentProgramScene", {
        sceneName: cutscene,
      });
    } catch (err) {
      this.log.warn(`Cannot change OBS scene [${cutscene}]: ${err}`);
      throw err;
    }
  }

  /** Switches current scene to intermission and enables studio mode if disabled. */
  async changeToIntermission() {
    try {
      await this.changeScene(
        this.config.scenes?.intermission ?? "Intermission",
      );
      await this.enableStudioMode();
      await this.stopRecording();
      commentators.value = [];
    } catch (err) {
      this.log.warn(`Error switching to intermission ${err}`);
    }
  }

  async changeToGame() {
    try {
      await this.changeScene(this.config.scenes?.game ?? "Game");
      await this.startRecording();
      commentators.value = [];
    } catch (err) {
      this.log.warn(`Error switching to game ${err}`);
    }
  }

  /** Enables studio mode if it's not enabled. */
  async enableStudioMode() {
    const studioModeStatus = (await this.call("GetStudioModeEnabled"))
      .studioModeEnabled;
    if (!studioModeStatus) {
      await this.call("SetStudioModeEnabled", { studioModeEnabled: true });
    }
  }

  async checkIfRecording() {
    try {
      const { outputActive } = await this.call("GetRecordStatus");
      this.isRecording = outputActive;
    } catch (err) {
      console.log(`Could not detect recording status ${err}`);
    }
  }

  async startRecording() {
    try {
      if (this.isRecording) return;
      await this.call("StartRecord");
      this.isRecording = true;
      console.log("Starting recording...");
    } catch (err) {
      this.log.warn(`Could not start recording ${err}`);
      throw err;
    }
  }

  async stopRecording() {
    try {
      if (!this.isRecording) return;
      await this.call("StopRecord");
      this.isRecording = false;
      console.log("Stopping recording...");
    } catch (err) {
      this.log.warn(`Could not stop recording ${err}`);
      throw err;
    }
  }

  async updateSourcePosition({
    name,
    positionX,
    positionY,
    width,
    height,
  }: SourcePosition) {
    try {
      const { sceneItemId } = await this.call("GetSceneItemId", {
        sceneName: "Game",
        sourceName: name,
      });

      void this.call("SetSceneItemTransform", {
        sceneName: "Game",
        sceneItemId,
        sceneItemTransform: {
          positionX: positionX,
          positionY: positionY,
          boundsType: "OBS_BOUNDS_STRETCH",
          boundsWidth: width,
          boundsHeight: height,
        },
      });
    } catch (err) {
      this.log.warn(`Cannot change OBS scene [${name}]: ${err}`);
      throw err;
    }
  }
}

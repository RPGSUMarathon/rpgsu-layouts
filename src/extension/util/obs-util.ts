import obsWebsocketJs from 'obs-websocket-js';
import { currentOBSScene } from './replicants';
import { get } from './nodecg';
import { TaggedLogger } from './tagged-logger';

const nodecg = get();

export class OBSUtility extends obsWebsocketJs {
  config = nodecg.bundleConfig.obs;
  connected = false;
  currentScene = '';
  private currentSceneReplicant = currentOBSScene;
  log = new TaggedLogger('obs');

  constructor() {
    super();

    this.currentSceneReplicant.on('change', (newVal) => {
      this.currentScene = newVal ?? '';
    });

    this.on('ConnectionClosed', () => {
      this.connected = false;
    });

    this.on('CurrentProgramSceneChanged', (data) => {
      if (data.sceneName === this.currentScene) return;

      this.currentSceneReplicant.value = data.sceneName;
    });
  }

  /** Connects to OBS if enabled in config. */
  connectToOBS() {
    if (!this.config.enabled) {
      this.log.warn('OBS integration disabled in config, not connecting!');
      return;
    }

    this.log.info('Setting up OBS connection.');
    this.connect(this.config.url, this.config.password)
      .then(() => {
        this.log.info('Connected to OBS!');
        this.connected = true;
      })
      .catch((err) => {
        this.log.warn('OBS connection error.');
        this.log.debug('OBS connection error:', err);
      });
  }

  /**
   * Change to this OBS scene.
   * @param name Name of the scene.
   */
  async changeScene(name: string): Promise<void> {
    try {
      await this.call('SetCurrentProgramScene', { sceneName: name });
    } catch (err) {
      this.log.warn(`Cannot change OBS scene [${name}]: ${err}`);
      throw err;
    }
  }

  /** Switches current scene to intermission and enables studio mode if disabled. */
  async changeToIntermission() {
    try {
      await this.changeScene(this.config.scenes?.intermission ?? 'Intermission');
      await this.enableStudioMode();
    } catch (err) {
      this.log.warn(`Error switching to intermission ${err}`);
    }
  }

  /** Enables studio mode if it's not enabled. */
  async enableStudioMode() {
    const studioModeStatus = (await this.call('GetStudioModeEnabled')).studioModeEnabled;
    if (!studioModeStatus) {
      await this.call('SetStudioModeEnabled', { studioModeEnabled: true });
    }
  }
}

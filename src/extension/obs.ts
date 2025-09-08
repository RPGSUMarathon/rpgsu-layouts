import { OBSUtility } from './util/obs-util';
import { get } from './util/nodecg';

const nodecg = get();
const obs = new OBSUtility();
const config = nodecg.bundleConfig.obs;

if (config.enabled) {
  obs.connectToOBS();

  obs.on('ConnectionClosed', () => {
    obs.log.warn('Disconnected from OBS! Attempting to reconnect in 5 seconds...');
    setTimeout(() => obs.connectToOBS(), 5000);
  });

}

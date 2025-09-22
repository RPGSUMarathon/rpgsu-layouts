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

  nodecg.listenFor('switchToIntermission', async () => {
    if (obs.currentScene === config.scenes!.intermission) return; // if we're already on intermission, don't do anything

    console.log("Changing to intermission");

    await obs.changeToIntermission();
    nodecg.sendMessageToBundle('changeToNextRun', 'nodecg-speedcontrol');
    nodecg.sendMessageToBundle('playbackStart', 'nodecg-foobar2000-controller');
  });

  nodecg.listenFor('switchToEnding', async () => {
    if (obs.currentScene === config.scenes!.ending) return; // if we're already on intermission, don't do anything

    console.log("Changing to ending");

    await obs.changeToEnding();
    nodecg.sendMessageToBundle('changeToNextRun', 'nodecg-speedcontrol');
    nodecg.sendMessageToBundle('playbackStart', 'nodecg-foobar2000-controller');
  });
}

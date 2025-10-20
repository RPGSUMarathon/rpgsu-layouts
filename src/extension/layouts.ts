import { get } from './util/nodecg';
import { LayoutInfo } from '@rpgsu-layouts/types/generated/layoutinfo';
const nodecg = get();


const speedcontrolBundle = 'nodecg-speedcontrol';

// A replicant that stores all the data for possible game layouts.
// It is intended that everything is set here and nowhere else.
// name: formal name used for GUI (e.g.: selecting in the override panel).
// code: the name used everywhere else, including the CSS file.
// These are the default values, additional ones can be added in the config.
const defaultLayouts : LayoutInfo[] = [
    { name: '4:3 1 Player', code: '4_3-1p' },
    { name: '16:9 1 Player', code: '16_9-1p' },
    { name: 'Game Boy 1 Player', code: 'gb-1p' },
    { name: 'GBA 1 Player', code: 'gba-1p' },
    { name: 'DS 1 Player', code: 'ds-1p' },
    { name: '3DS 1 Player', code: '3ds-1p' },
];


// Actual replicant in memory.
const layouts = nodecg.Replicant<LayoutInfo[]>('gameLayouts', {
    defaultValue: defaultLayouts,
    persistent: false
});

// Current layout info stored in here. Defaults to the first one in the list above.
const currentGameLayout = nodecg.Replicant<LayoutInfo>('currentGameLayout', {
    defaultValue: defaultLayouts[0]?.code,
});
// Listens for the current run to change, to get it's layout info.
const runDataActiveRun = nodecg.Replicant('runDataActiveRun', speedcontrolBundle);
runDataActiveRun.on('change', (newVal, oldVal) => {
    // If the run has the same ID, we don't need to change the layout.
    // This stops the layout messing up if you force change it and *then* edit run data.
    if (newVal && oldVal && newVal.id === oldVal.id) {
        nodecg.log.debug("Run ID %s did not change, not updating layout", newVal.id);
        return;
    }

    if (newVal) {
        let layoutCode;
        if (newVal.customData && newVal.customData.layout) {
            layoutCode = newVal.customData.layout;
        } else {
            nodecg.log.warn("Run ID %s does not have custom data for layout", newVal.id);
            return;
        }
        if (layoutCode) {
            if (!currentGameLayout.value || layoutCode !== currentGameLayout.value.code) {
                // setCurrentGameLayout(layoutCode);
                currentGameLayout.value = layoutCode;
                nodecg.log.info("Updated layout to %s", layoutCode);
            } else {
                nodecg.log.debug("Current layout %s matches new run ID %s, not changing", layoutCode, newVal.id);
            }
        } else {
            nodecg.log.error("No layout found for run ID %s, layout %s", newVal.id, layoutCode);
        }
    }
});


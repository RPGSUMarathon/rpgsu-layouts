import { type Countdown, type CountdownRunning } from "@rpgsu-layouts/types";
import { get } from "./util/nodecg";
import TimeUtils, { type ICountdownTimer, type TimeStruct } from "./util/time";

const nodecg = get();

const time = nodecg.Replicant<Countdown>("countdown", {
  defaultValue: TimeUtils.createTimeStruct(600 * 1000),
  persistent: false,
});

const running = nodecg.Replicant<CountdownRunning>("countdownRunning", {
  defaultValue: false,
  persistent: false,
});
let countdownTimer: ICountdownTimer;

const start = (startTime = "10:00") => {
  if (running.value) {
    return;
  }

  const durationMs = TimeUtils.parseTimeString(startTime);
  if (durationMs <= 0) {
    return;
  }

  running.value = true;
  time.value = TimeUtils.createTimeStruct(durationMs);

  if (countdownTimer) {
    countdownTimer.stop();
    countdownTimer.removeAllListeners();
  }

  countdownTimer = new TimeUtils.CountdownTimer(Date.now() + durationMs);
  countdownTimer.on("tick", (remainingTimeStruct: TimeStruct) => {
    time.value = remainingTimeStruct;
  });
};

const stop = () => {
  if (!running.value) {
    return;
  }

  running.value = false;
  if (countdownTimer) {
    countdownTimer.stop();
  }
};

nodecg.listenFor("startCountdown", (startTime: string) => {
  start(startTime);
});
nodecg.listenFor("stopCountdown", () => {
  stop();
});

import { RunData } from '../../bundles/nodecg-speedcontrol/src/types'

export class Helpers {
    public static formatPlayers(run: RunData) {
        return (
            run.teams
                .map((team) => team.name || team.players.map((player) => player.name).join(', '))
                .join(' vs. ') || 'No players'
        );
    }
}

export const TimeHelper = {

  parseUTCTime: (utcTimeString: string) => {
    return new Date(utcTimeString);
  },


  getDay: (utcTimeString: string) => {
    const date = TimeHelper.parseUTCTime(utcTimeString);
    return date.getDate();
  },

  getWeekDay: (utcTimeString: string) => {
    const date = TimeHelper.parseUTCTime(utcTimeString);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getUTCDay()];
  },

  /**
   * Gets the short day name from a UTC time string
   * @param {string} utcTimeString - UTC time string
   * @returns {string} - Short day name (e.g., "Mon")
   */
  getShortDay: (utcTimeString: string) => {
    const date = TimeHelper.parseUTCTime(utcTimeString);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getUTCDay()];
  },


  formatLocalTime: (utcTimeString: string) => {
    const date = TimeHelper.parseUTCTime(utcTimeString);
    return date.toLocaleString();
  },

};


export default TimeHelper;
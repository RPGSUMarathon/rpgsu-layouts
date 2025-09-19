import TimeHelper from "@rpgsu-layouts/browser/helpers";

/**
 * React component example using the TimeHelper
 */
export const TimeDisplay = ({ utcTimeString }) => {
  const timeInfo = TimeHelper.getTimeDifference(utcTimeString);
  const day = TimeHelper.getDay(utcTimeString);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Time Information</h3>
      <p><strong>UTC Time:</strong> {utcTimeString}</p>
      <p><strong>Local Time:</strong> {TimeHelper.formatLocalTime(utcTimeString)}</p>
      <p><strong>Day of Week:</strong> {day}</p>
      <p><strong>Time Difference:</strong> {timeInfo.humanReadable}</p>
      <p>
        <strong>Status:</strong>{' '}
        <span style={{ color: timeInfo.isPast ? '#e74c3c' : '#27ae60' }}>
          {timeInfo.isPast ? 'Past event' : timeInfo.isNow ? 'Happening now' : 'Future event'}
        </span>
      </p>
      <p><strong>Detailed:</strong> {Math.abs(timeInfo.days)} days, {timeInfo.hours % 24} hours, {timeInfo.minutes % 60} minutes</p>
    </div>
  );
};
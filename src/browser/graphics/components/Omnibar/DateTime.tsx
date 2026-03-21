import { DateTime } from "luxon";
import { useEffect, useState } from "react";

function getCurrentDateTime() {
  const now = DateTime.now();
  return { date: now.toFormat("yyyy/MM/dd"), time: now.toFormat("HH:mm") };
}

export const OmnibarDateTime = ({ className }: { className?: string }) => {
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateInterval = setInterval(() => {
      const { date, time } = getCurrentDateTime();
      setDate(date);
      setTime(time);
    }, 1000);

    return () => clearInterval(updateInterval);
  }, []);

  return (
    <div
      id="omnibar-date-time"
      className={`h-full flex flex-col text-right font-bold ${className}`}
    >
      <span id="omnibar-time">{time}</span>
      <span id="omnibar-date">{date}</span>
    </div>
  );
};

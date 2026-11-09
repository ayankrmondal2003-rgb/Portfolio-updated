import { useState, useEffect } from "react";

export function LocalTimeBadge() {
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format: "2:00pm • 31 October, 2026"
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "pm" : "am";
      const formattedHour = hours % 12 || 12;

      const day = now.getDate();
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      const month = monthNames[now.getMonth()];
      const year = now.getFullYear();

      setTimeStr(`Local time ${formattedHour}:${minutes}${ampm} • ${day} ${month}, ${year}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="local-time-badge mono" aria-label="Current local time and date">
      <span className="live-clock-pulse" aria-hidden="true" />
      <span>{timeStr || "Local time 2:00pm • 2026"}</span>
    </div>
  );
}


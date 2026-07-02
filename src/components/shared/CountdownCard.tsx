import { useEffect, useState } from "react";
import { formatCountdownValue, getCountdownParts } from "../../lib/date";

export function CountdownCard({ targetDate }: { targetDate: string }) {
  const [countdown, setCountdown] = useState(() => getCountdownParts(targetDate));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getCountdownParts(targetDate));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [targetDate]);

  return (
    <article className="countdown-card">
      <div>
        <p className="eyebrow">Next remembrance</p>
        <h3>Preparing for the next anniversary gathering.</h3>
      </div>
      <div className="countdown-grid">
        {Object.entries(countdown).map(([key, value]) => (
          <div key={key} className="countdown-box">
            <strong>{formatCountdownValue(value)}</strong>
            <span>{key}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

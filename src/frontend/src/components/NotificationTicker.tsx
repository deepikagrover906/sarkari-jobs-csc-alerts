import type { Alert } from "../hooks/useQueries";

interface NotificationTickerProps {
  alerts: Alert[];
}

export default function NotificationTicker({
  alerts,
}: NotificationTickerProps) {
  const text =
    alerts.length > 0
      ? alerts.map((a) => `🔔 ${a.title}`).join("   •   ")
      : "🔔 Welcome to Sarkari Jobs & CSC Alerts Portal — Your trusted source for government job updates!";

  return (
    <div className="bg-[oklch(0.72_0.18_55)] text-white py-1.5 overflow-hidden">
      <div className="flex items-center gap-3">
        <span className="shrink-0 bg-[oklch(0.22_0.08_255)] text-white text-xs font-bold px-3 py-0.5 uppercase tracking-wider ml-3">
          LIVE
        </span>
        <div className="overflow-hidden flex-1">
          <span className="ticker-scroll text-sm font-medium">{text}</span>
        </div>
      </div>
    </div>
  );
}

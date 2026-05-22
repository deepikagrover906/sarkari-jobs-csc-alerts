import { BellIcon, CalendarIcon } from "lucide-react";
import type { Alert } from "../hooks/useQueries";

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

interface AlertCardProps {
  alert: Alert;
  index: number;
}

export default function AlertCard({ alert, index }: AlertCardProps) {
  return (
    <article
      data-ocid={`alerts.item.${index}`}
      className="flex gap-4 bg-card border border-border rounded-xl p-4 shadow-xs hover:shadow-card transition-shadow"
    >
      <div className="shrink-0 mt-0.5">
        <div className="w-9 h-9 rounded-full bg-[oklch(0.5_0.16_155/0.12)] border border-[oklch(0.5_0.16_155/0.3)] flex items-center justify-center">
          <BellIcon className="w-4 h-4 text-[oklch(0.5_0.16_155)]" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-display font-semibold text-foreground text-sm mb-1 leading-snug">
          {alert.title}
        </h4>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
          {alert.description}
        </p>
        <div className="flex items-center gap-1.5 mt-2 text-muted-foreground">
          <CalendarIcon className="w-3.5 h-3.5" />
          <span className="text-xs">{formatDate(alert.date)}</span>
        </div>
      </div>
    </article>
  );
}

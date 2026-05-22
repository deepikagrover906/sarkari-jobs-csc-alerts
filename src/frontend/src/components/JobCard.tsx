import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  ClockIcon,
  ExternalLinkIcon,
  GraduationCapIcon,
  UsersIcon,
} from "lucide-react";
import { Type } from "../backend.d";
import type { Job } from "../hooks/useQueries";

const CATEGORY_CONFIG: Record<Type, { label: string; color: string }> = {
  [Type.centralGovt]: {
    label: "Central Govt",
    color: "bg-[oklch(0.22_0.08_255)] text-white",
  },
  [Type.stateGovt]: {
    label: "State Govt",
    color: "bg-[oklch(0.45_0.15_280)] text-white",
  },
  [Type.csc]: { label: "CSC", color: "bg-[oklch(0.5_0.16_155)] text-white" },
  [Type.railway]: {
    label: "Railway",
    color: "bg-[oklch(0.55_0.18_30)] text-white",
  },
  [Type.banking]: {
    label: "Banking",
    color: "bg-[oklch(0.48_0.15_240)] text-white",
  },
  [Type.defence]: {
    label: "Defence",
    color: "bg-[oklch(0.4_0.12_165)] text-white",
  },
};

function isDateSoon(dateStr: string): boolean {
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 7;
  } catch {
    return false;
  }
}

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

interface JobCardProps {
  job: Job;
  index: number;
}

export default function JobCard({ job, index }: JobCardProps) {
  const catConfig = CATEGORY_CONFIG[job.category] ?? {
    label: job.category,
    color: "bg-muted text-foreground",
  };
  const lastDateSoon = isDateSoon(job.lastDate);

  return (
    <article
      data-ocid={`jobs.item.${index}`}
      className="job-card bg-card rounded-xl border border-border shadow-card hover:shadow-card-hover overflow-hidden"
    >
      {/* Category strip */}
      <div className={`h-1.5 ${catConfig.color.split(" ")[0]}`} />
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1">
            <h3 className="font-display font-semibold text-foreground text-base leading-snug line-clamp-2 mb-1">
              {job.title}
            </h3>
            <p className="text-muted-foreground text-sm font-medium">
              {job.department}
            </p>
          </div>
          <span
            className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-full ${catConfig.color}`}
          >
            {catConfig.label}
          </span>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <div className="flex items-center gap-2 bg-muted/60 rounded-lg px-3 py-2">
            <UsersIcon className="w-3.5 h-3.5 text-[oklch(0.22_0.08_255)] shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Vacancies</p>
              <p className="text-sm font-bold text-foreground">
                {job.vacancies.toString()}
              </p>
            </div>
          </div>
          <div
            className={`flex items-center gap-2 rounded-lg px-3 py-2 ${lastDateSoon ? "bg-[oklch(0.98_0.05_30)] border border-[oklch(0.72_0.18_55/0.4)]" : "bg-muted/60"}`}
          >
            <ClockIcon
              className={`w-3.5 h-3.5 shrink-0 ${lastDateSoon ? "text-[oklch(0.55_0.18_30)]" : "text-[oklch(0.22_0.08_255)]"}`}
            />
            <div>
              <p className="text-xs text-muted-foreground">Last Date</p>
              <p
                className={`text-sm font-bold ${lastDateSoon ? "text-[oklch(0.55_0.18_30)]" : "text-foreground"}`}
              >
                {formatDate(job.lastDate)}
                {lastDateSoon && (
                  <span className="ml-1 text-xs text-[oklch(0.65_0.18_30)]">
                    ⚠
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Qualification */}
        <div className="flex items-start gap-2 mb-4">
          <GraduationCapIcon className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
          <p className="text-sm text-muted-foreground line-clamp-2">
            {job.qualification}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span className="text-xs">{formatDate(job.postedDate)}</span>
          </div>
          <Button
            asChild
            size="sm"
            data-ocid={`jobs.apply.button.${index}`}
            className="bg-[oklch(0.72_0.18_55)] hover:bg-[oklch(0.68_0.2_55)] text-white font-semibold shadow-sm"
          >
            <a href={job.applyLink} target="_blank" rel="noopener noreferrer">
              Apply Now <ExternalLinkIcon className="w-3.5 h-3.5 ml-1" />
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}

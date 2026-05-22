import {
  BellIcon,
  BriefcaseIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react";

interface StatsBarProps {
  jobsCount: number;
  alertsCount: number;
}

export default function StatsBar({ jobsCount, alertsCount }: StatsBarProps) {
  return (
    <div className="bg-white border-b border-border shadow-xs">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[oklch(0.22_0.08_255/0.08)] flex items-center justify-center">
              <BriefcaseIcon className="w-5 h-5 text-[oklch(0.22_0.08_255)]" />
            </div>
            <div>
              <p className="text-xl font-display font-bold text-foreground">
                {jobsCount}
              </p>
              <p className="text-xs text-muted-foreground">Active Jobs</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[oklch(0.5_0.16_155/0.1)] flex items-center justify-center">
              <BellIcon className="w-5 h-5 text-[oklch(0.5_0.16_155)]" />
            </div>
            <div>
              <p className="text-xl font-display font-bold text-foreground">
                {alertsCount}
              </p>
              <p className="text-xs text-muted-foreground">CSC Alerts</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[oklch(0.72_0.18_55/0.1)] flex items-center justify-center">
              <UsersIcon className="w-5 h-5 text-[oklch(0.72_0.18_55)]" />
            </div>
            <div>
              <p className="text-xl font-display font-bold text-foreground">
                6
              </p>
              <p className="text-xs text-muted-foreground">Categories</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[oklch(0.58_0.18_145/0.1)] flex items-center justify-center">
              <TrendingUpIcon className="w-5 h-5 text-[oklch(0.58_0.18_145)]" />
            </div>
            <div>
              <p className="text-xl font-display font-bold text-foreground">
                Daily
              </p>
              <p className="text-xs text-muted-foreground">Updates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

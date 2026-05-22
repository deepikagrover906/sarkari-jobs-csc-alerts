import { Button } from "@/components/ui/button";
import { BellIcon, BriefcaseIcon } from "lucide-react";

interface HeaderProps {
  onAdminClick: () => void;
  jobsCount: number;
  alertsCount: number;
}

export default function Header({
  onAdminClick,
  jobsCount,
  alertsCount,
}: HeaderProps) {
  return (
    <header className="bg-[oklch(0.22_0.08_255)] text-white shadow-lg">
      {/* Tricolor stripe */}
      <div className="tricolor-stripe" />
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="bg-[oklch(0.72_0.18_55)] rounded-lg p-2 shadow">
              <BriefcaseIcon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl md:text-2xl leading-tight text-white">
                Sarkari Jobs
                <span className="text-[oklch(0.72_0.18_55)]"> & </span>
                CSC Alerts
              </h1>
              <p className="text-[oklch(0.85_0.02_255)] text-xs hidden sm:block">
                सरकारी नौकरी एवं CSC सूचनाएं
              </p>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex items-center gap-4">
            <a
              href="#jobs"
              data-ocid="nav.home.link"
              className="text-[oklch(0.85_0.02_255)] hover:text-white transition-colors text-sm font-medium hidden md:block"
            >
              Jobs
            </a>
            <a
              href="#alerts"
              className="text-[oklch(0.85_0.02_255)] hover:text-white transition-colors text-sm font-medium hidden md:block"
            >
              Alerts
            </a>
            <div className="hidden md:flex items-center gap-3 bg-[oklch(0.28_0.1_255)] rounded-full px-4 py-1.5 text-sm">
              <span className="text-[oklch(0.72_0.18_55)] font-bold">
                {jobsCount}
              </span>
              <span className="text-[oklch(0.75_0.02_255)]">Jobs</span>
              <span className="w-px h-4 bg-[oklch(0.35_0.08_255)]" />
              <BellIcon className="w-3.5 h-3.5 text-[oklch(0.72_0.18_55)]" />
              <span className="text-[oklch(0.72_0.18_55)] font-bold">
                {alertsCount}
              </span>
              <span className="text-[oklch(0.75_0.02_255)]">Alerts</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onAdminClick}
              data-ocid="nav.admin.link"
              className="text-[oklch(0.6_0.01_255)] hover:text-white hover:bg-[oklch(0.28_0.1_255)] text-xs"
            >
              Admin
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}

import { SearchIcon } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="bg-[oklch(0.22_0.08_255)] text-white pb-12 pt-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-[oklch(0.72_0.18_55/0.2)] border border-[oklch(0.72_0.18_55/0.4)] rounded-full px-4 py-1.5 text-[oklch(0.85_0.18_55)] text-sm font-medium mb-4">
          <span className="inline-block w-2 h-2 rounded-full bg-[oklch(0.72_0.18_55)] animate-pulse" />
          Live Job Updates
        </div>
        <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-4 leading-tight">
          Find Your{" "}
          <span className="text-[oklch(0.72_0.18_55)]">Sarkari Job</span>
        </h2>
        <p className="text-[oklch(0.75_0.02_255)] text-lg max-w-2xl mx-auto mb-6">
          Latest government job notifications, CSC updates, railway, banking &
          defence recruitment alerts — all in one place.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <a
            href="#jobs"
            className="inline-flex items-center gap-2 bg-[oklch(0.72_0.18_55)] hover:bg-[oklch(0.68_0.2_55)] text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-lg"
          >
            <SearchIcon className="w-4 h-4" />
            Browse Jobs
          </a>
          <a
            href="#alerts"
            className="inline-flex items-center gap-2 bg-transparent border-2 border-[oklch(0.5_0.16_155)] hover:bg-[oklch(0.5_0.16_155/0.15)] text-[oklch(0.8_0.1_155)] font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            View CSC Alerts
          </a>
        </div>
      </div>
    </section>
  );
}

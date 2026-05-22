import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { BellIcon, BriefcaseIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Type } from "./backend.d";
import AdminPanel from "./components/AdminPanel";
import AlertCard from "./components/AlertCard";
import CategoryFilter from "./components/CategoryFilter";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import JobCard from "./components/JobCard";
import NotificationTicker from "./components/NotificationTicker";
import StatsBar from "./components/StatsBar";
import {
  useAddSampleData,
  useGetAllAlerts,
  useGetAllJobs,
} from "./hooks/useQueries";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Type | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [seeded, setSeeded] = useState(false);

  const jobsQuery = useGetAllJobs();
  const alertsQuery = useGetAllAlerts();
  const addSampleData = useAddSampleData();

  // Seed sample data on first load if empty
  useEffect(() => {
    if (
      !seeded &&
      !jobsQuery.isFetching &&
      jobsQuery.data !== undefined &&
      jobsQuery.data.length === 0
    ) {
      setSeeded(true);
      addSampleData.mutate();
    }
  }, [jobsQuery.data, jobsQuery.isFetching, seeded, addSampleData]);

  const allJobs = jobsQuery.data ?? [];
  const allAlerts = alertsQuery.data ?? [];

  const filteredJobs = useMemo(() => {
    if (!selectedCategory) return allJobs;
    return allJobs.filter((j) => j.category === selectedCategory);
  }, [allJobs, selectedCategory]);

  const isLoading = jobsQuery.isLoading || alertsQuery.isLoading;

  return (
    <div className="min-h-screen flex flex-col bg-background font-body">
      <Toaster richColors position="top-right" />

      {/* Notification Ticker */}
      <NotificationTicker alerts={allAlerts} />

      {/* Header */}
      <Header
        onAdminClick={() => setAdminOpen(true)}
        jobsCount={allJobs.length}
        alertsCount={allAlerts.length}
      />

      {/* Hero */}
      <HeroSection />

      {/* Stats Bar */}
      <StatsBar jobsCount={allJobs.length} alertsCount={allAlerts.length} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 space-y-12">
        {/* Jobs Section */}
        <section id="jobs">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[oklch(0.22_0.08_255/0.1)] flex items-center justify-center">
              <BriefcaseIcon className="w-4 h-4 text-[oklch(0.22_0.08_255)]" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-foreground">
                Latest Government Jobs
              </h2>
              <p className="text-muted-foreground text-sm">
                {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""}{" "}
                available
              </p>
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <CategoryFilter
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>

          {/* Jobs Grid */}
          {isLoading ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              data-ocid="jobs.loading_state"
            >
              {Array.from({ length: 6 }, (_, i) => i).map((i) => (
                <Skeleton key={i} className="h-64 rounded-xl" />
              ))}
            </div>
          ) : filteredJobs.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-16 text-center"
              data-ocid="jobs.empty_state"
            >
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <BriefcaseIcon className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-1">
                No jobs found
              </h3>
              <p className="text-muted-foreground text-sm">
                {selectedCategory
                  ? "Try selecting a different category."
                  : "No active job listings at the moment."}
              </p>
            </div>
          ) : (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              data-ocid="jobs.list"
            >
              {filteredJobs.map((job, idx) => (
                <JobCard key={job.id.toString()} job={job} index={idx + 1} />
              ))}
            </div>
          )}
        </section>

        {/* Alerts Section */}
        <section id="alerts">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[oklch(0.5_0.16_155/0.1)] flex items-center justify-center">
              <BellIcon className="w-4 h-4 text-[oklch(0.5_0.16_155)]" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-foreground">
                CSC Alerts & Updates
              </h2>
              <p className="text-muted-foreground text-sm">
                Latest notifications from Common Service Centre
              </p>
            </div>
          </div>

          {alertsQuery.isLoading ? (
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              data-ocid="alerts.loading_state"
            >
              {Array.from({ length: 4 }, (_, i) => i).map((i) => (
                <Skeleton key={i} className="h-28 rounded-xl" />
              ))}
            </div>
          ) : allAlerts.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-16 text-center"
              data-ocid="alerts.empty_state"
            >
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <BellIcon className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-1">
                No alerts
              </h3>
              <p className="text-muted-foreground text-sm">
                No active alerts at the moment.
              </p>
            </div>
          ) : (
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              data-ocid="alerts.list"
            >
              {allAlerts.map((alert, idx) => (
                <AlertCard
                  key={alert.id.toString()}
                  alert={alert}
                  index={idx + 1}
                />
              ))}
            </div>
          )}
        </section>

        {/* WhatsApp CTA Banner */}
        <section className="rounded-2xl bg-[oklch(0.22_0.08_255)] text-white overflow-hidden">
          <div className="tricolor-stripe" />
          <div className="px-6 py-8 text-center">
            <p className="font-display font-bold text-2xl mb-2">
              🔰 Stay Updated Instantly
            </p>
            <p className="text-[oklch(0.75_0.02_255)] mb-6">
              Join our WhatsApp channel for real-time government job
              notifications and CSC alerts
            </p>
            <a
              href="https://whatsapp.com/channel/0029Vadt7Lc0G0XqA5g4Om3v"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[oklch(0.58_0.18_145)] hover:bg-[oklch(0.54_0.2_145)] text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-xl text-lg"
            >
              <svg
                role="img"
                aria-label="WhatsApp"
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>WhatsApp</title>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Follow WhatsApp Channel 👇👇
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Admin Panel */}
      <AdminPanel
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        jobs={allJobs}
        alerts={allAlerts}
      />
    </div>
  );
}

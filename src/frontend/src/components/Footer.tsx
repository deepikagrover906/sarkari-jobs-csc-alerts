import { MessageCircleIcon, PhoneIcon } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const cafLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-[oklch(0.15_0.03_250)] text-white">
      {/* Tricolor stripe */}
      <div className="tricolor-stripe" />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-display font-bold text-lg text-white mb-2">
              Sarkari Jobs & CSC Alerts
            </h3>
            <p className="text-[oklch(0.7_0.02_255)] text-sm leading-relaxed">
              Your trusted portal for the latest government job notifications
              and CSC alerts across India.
            </p>
          </div>

          {/* WhatsApp Channel */}
          <div>
            <p className="font-semibold text-[oklch(0.85_0.18_55)] mb-3 text-sm uppercase tracking-wide">
              Stay Updated
            </p>
            <a
              href="https://whatsapp.com/channel/0029Vadt7Lc0G0XqA5g4Om3v"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="footer.whatsapp.button"
              className="inline-flex items-center gap-3 bg-[oklch(0.58_0.18_145)] hover:bg-[oklch(0.54_0.2_145)] text-white font-bold px-5 py-3 rounded-xl transition-colors shadow-lg"
            >
              <MessageCircleIcon className="w-5 h-5" />
              <div className="text-left">
                <div className="text-sm">🔰 Follow WhatsApp channel</div>
                <div className="text-xs font-normal opacity-90">
                  for instant updates 👇👇
                </div>
              </div>
            </a>
          </div>

          {/* Contact */}
          <div>
            <p className="font-semibold text-[oklch(0.85_0.18_55)] mb-3 text-sm uppercase tracking-wide">
              Contact Details
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[oklch(0.75_0.02_255)] text-sm">
                <span className="text-[oklch(0.72_0.18_55)] font-bold">👤</span>
                <span className="text-white font-medium">Mr. Ankush Gulia</span>
              </div>
              <div className="flex items-center gap-2 text-[oklch(0.75_0.02_255)] text-sm">
                <PhoneIcon className="w-4 h-4 text-[oklch(0.72_0.18_55)]" />
                <a
                  href="tel:9588301143"
                  className="text-white font-medium hover:text-[oklch(0.72_0.18_55)] transition-colors"
                >
                  9588301143
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[oklch(0.3_0.04_255)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[oklch(0.55_0.02_255)] text-sm">
            © {year} Sarkari Jobs & CSC Alerts. All rights reserved.
          </p>
          <p className="text-[oklch(0.45_0.02_255)] text-xs">
            Built with ❤️ using{" "}
            <a
              href={cafLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[oklch(0.65_0.08_255)] hover:text-white transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

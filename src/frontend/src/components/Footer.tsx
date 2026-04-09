import { useNavigate } from "@tanstack/react-router";
import { SiInstagram, SiTiktok, SiX } from "react-icons/si";
import { toast } from "sonner";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Cart", href: "/cart" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "befikr.co";
  const navigate = useNavigate();

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <p className="font-display text-xl font-bold tracking-widest mb-4">
              BEFIKR CO.
            </p>
            <p className="text-sm leading-relaxed opacity-60 max-w-xs">
              Streetwear for the unbothered generation. Confidence, comfort, and
              not overthinking life.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="opacity-60 hover:opacity-100 transition-smooth"
              >
                <SiInstagram size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="opacity-60 hover:opacity-100 transition-smooth"
              >
                <SiX size={18} />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="opacity-60 hover:opacity-100 transition-smooth"
              >
                <SiTiktok size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs tracking-widest uppercase font-semibold mb-4 opacity-40">
              Navigate
            </p>
            <ul className="flex flex-col gap-3">
              {footerLinks.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate({ to: href as "/" });
                    }}
                    className="text-sm opacity-60 hover:opacity-100 transition-smooth tracking-wide cursor-pointer"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <p className="text-xs tracking-widest uppercase font-semibold mb-4 opacity-40">
              Stay Updated
            </p>
            <p className="text-sm opacity-60 mb-4 leading-relaxed">
              New drops. No spam. Ever.
            </p>
            <div className="flex border border-background/30">
              <input
                type="email"
                placeholder="your@email.com"
                className="bg-transparent text-background placeholder:text-background/30 text-sm px-3 py-2.5 flex-1 outline-none min-w-0"
                aria-label="Email for newsletter"
              />
              <button
                type="button"
                onClick={() => toast("Subscribed! Stay Befikr.")}
                className="px-3 py-2.5 text-xs tracking-widest uppercase bg-background text-foreground font-semibold hover:bg-background/90 transition-smooth whitespace-nowrap"
              >
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs opacity-30 tracking-wide">
            © {year} Befikr Co. All rights reserved.
          </p>
          <p className="text-xs opacity-30">
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-60 transition-smooth underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

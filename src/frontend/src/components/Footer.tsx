import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiInstagram, SiTiktok, SiX } from "react-icons/si";
import { toast } from "sonner";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Cart", href: "/cart" },
];

const socialLinks = [
  {
    icon: SiInstagram,
    href: "https://instagram.com",
    label: "Instagram",
    color: "#CCFF00",
    glow: "rgba(204,255,0,0.5)",
  },
  {
    icon: SiX,
    href: "https://twitter.com",
    label: "X / Twitter",
    color: "#00D9FF",
    glow: "rgba(0,217,255,0.5)",
  },
  {
    icon: SiTiktok,
    href: "https://tiktok.com",
    label: "TikTok",
    color: "#FF006B",
    glow: "rgba(255,0,107,0.5)",
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "befikr.co";
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email.includes("@")) {
      toast.error("Enter a valid email.");
      return;
    }
    toast.success("You're in. Stay Befikr.");
    setEmail("");
  };

  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #0a0a0a 0%, #000000 100%)",
        borderTop: "1px solid rgba(204,255,0,0.12)",
      }}
    >
      {/* Top neon accent bar */}
      <div
        style={{
          height: "2px",
          background:
            "linear-gradient(90deg, #CCFF00 0%, #00D9FF 50%, #FF006B 100%)",
          boxShadow: "0 0 12px rgba(204,255,0,0.4)",
        }}
      />

      <div className="max-w-7xl mx-auto px-8 py-20">
        {/* Money mindset tagline */}
        <div className="text-center mb-16">
          <p
            className="font-display font-black text-2xl md:text-3xl tracking-[0.12em] uppercase"
            style={{
              background:
                "linear-gradient(135deg, #CCFF00 0%, #00D9FF 60%, #FF006B 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            LIMITED DROPS. UNLIMITED MINDSET.
          </p>
          <div
            className="neon-divider-lime mx-auto mt-5"
            style={{ maxWidth: "240px" }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-14 md:gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <p
              className="font-display text-2xl font-black tracking-[0.18em] mb-5"
              style={{
                color: "#CCFF00",
                textShadow: "0 0 14px rgba(204,255,0,0.5)",
              }}
            >
              BEFIKR CO.
            </p>
            <p className="text-sm leading-relaxed text-foreground/50 max-w-xs font-medium">
              Streetwear for the unbothered generation. Confidence, comfort, and
              not overthinking life.
            </p>

            {/* Social icons */}
            <div className="flex gap-5 mt-8">
              {socialLinks.map(({ icon: Icon, href, label, color, glow }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 border"
                  style={{
                    borderColor: "rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.45)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = color;
                    el.style.borderColor = color;
                    el.style.boxShadow = `0 0 12px ${glow}, 0 0 24px ${glow}`;
                    el.style.transform = "scale(1.18)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = "rgba(255,255,255,0.45)";
                    el.style.borderColor = "rgba(255,255,255,0.08)";
                    el.style.boxShadow = "none";
                    el.style.transform = "scale(1)";
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div>
            <p
              className="text-[10px] tracking-[0.25em] uppercase font-black mb-6"
              style={{ color: "#00D9FF" }}
            >
              Navigate
            </p>
            <div className="neon-divider-cyan mb-5" />
            <ul className="flex flex-col gap-4">
              {footerLinks.map(({ label, href }) => (
                <li key={href}>
                  <button
                    type="button"
                    onClick={() => navigate({ to: href as "/" })}
                    className="text-sm text-foreground/50 hover:text-foreground transition-smooth font-semibold tracking-wide cursor-pointer"
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color =
                        "#CCFF00";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color = "";
                    }}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <p
              className="text-[10px] tracking-[0.25em] uppercase font-black mb-6"
              style={{ color: "#FF006B" }}
            >
              Stay Updated
            </p>
            <div className="neon-divider-pink mb-5" />
            <p className="text-sm text-foreground/50 mb-6 leading-relaxed font-medium">
              New drops. No spam. Ever.
            </p>
            <div
              className="flex overflow-hidden"
              style={{ border: "1px solid rgba(255,0,107,0.3)" }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                placeholder="your@email.com"
                className="bg-transparent text-foreground placeholder:text-foreground/25 text-sm px-4 py-3 flex-1 outline-none min-w-0 font-medium"
                aria-label="Email for newsletter"
              />
              <button
                type="button"
                onClick={handleSubscribe}
                className="px-4 py-3 text-[10px] tracking-[0.15em] uppercase font-black transition-smooth whitespace-nowrap"
                style={{ background: "#FF006B", color: "#000000" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 0 14px rgba(255,0,107,0.5)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "none";
                }}
              >
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Neon bottom divider */}
        <div className="mt-16 mb-8 neon-divider-lime opacity-30" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-[11px] text-foreground/30 tracking-widest font-medium">
            © {year} Befikr Co. All rights reserved.
          </p>
          <p className="text-[11px] text-foreground/30 font-medium">
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-smooth underline underline-offset-2 hover:text-foreground/60"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export { footerLinks };

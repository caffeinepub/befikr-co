import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useNavigate } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "/", accent: "nav-underline-lime" },
  { label: "Shop", href: "/shop", accent: "nav-underline-cyan" },
  { label: "About", href: "/about", accent: "nav-underline-pink" },
  { label: "Contact", href: "/contact", accent: "nav-underline-lime" },
];

const mobileAccents = ["#CCFF00", "#00D9FF", "#FF006B", "#CCFF00"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-ocid="navbar"
      style={{
        background: scrolled ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0.92)",
        borderBottom: "1px solid rgba(204,255,0,0.18)",
        boxShadow: scrolled ? "0 2px 20px rgba(204,255,0,0.08)" : "none",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <nav
        className="max-w-7xl mx-auto px-8 h-18 flex items-center justify-between"
        style={{ height: "4.5rem" }}
      >
        {/* Logo */}
        <button
          type="button"
          data-ocid="navbar-logo"
          onClick={() => {
            navigate({ to: "/" });
            setMenuOpen(false);
          }}
          className="font-display font-black tracking-[0.18em] text-lg cursor-pointer glitch transition-smooth select-none"
          style={{
            color: "#CCFF00",
            textShadow:
              "0 0 14px rgba(204,255,0,0.6), 0 0 30px rgba(204,255,0,0.3)",
            letterSpacing: "0.18em",
          }}
        >
          BEFIKR CO.
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map(({ label, href, accent }) => (
            <li key={href}>
              <button
                type="button"
                onClick={() => navigate({ to: href as "/" })}
                className={cn(
                  "text-[11px] tracking-[0.2em] uppercase font-bold text-foreground/70 hover:text-foreground transition-smooth cursor-pointer nav-underline",
                  accent,
                )}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Cart + mobile toggle */}
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => navigate({ to: "/cart" })}
            data-ocid="cart-icon"
            className="relative flex items-center cursor-pointer group"
            aria-label="Open cart"
          >
            <ShoppingBag
              size={22}
              className="text-foreground/80 group-hover:text-foreground transition-smooth"
            />
            {totalItems > 0 && (
              <span
                className="absolute -top-2 -right-2 w-[18px] h-[18px] text-[9px] font-black flex items-center justify-center rounded-full pulse-glow"
                style={{
                  background: "#CCFF00",
                  color: "#000000",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </button>

          <button
            type="button"
            data-ocid="mobile-menu-toggle"
            className="md:hidden flex items-center justify-center text-foreground/80 hover:text-foreground transition-smooth"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          data-ocid="mobile-menu"
          className="md:hidden animate-slide-down"
          style={{
            background: "rgba(0,0,0,0.97)",
            borderBottom: "1px solid rgba(204,255,0,0.15)",
          }}
        >
          {/* Neon divider at top */}
          <div className="neon-divider-lime w-full" />
          <ul className="flex flex-col px-8 py-8 gap-7">
            {navLinks.map(({ label, href }, i) => (
              <li key={href}>
                <button
                  type="button"
                  onClick={() => {
                    navigate({ to: href as "/" });
                    setMenuOpen(false);
                  }}
                  className="text-base tracking-[0.15em] uppercase font-bold transition-smooth cursor-pointer block w-full text-left"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color =
                      mobileAccents[i];
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "rgba(255,255,255,0.65)";
                  }}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

export { navLinks };

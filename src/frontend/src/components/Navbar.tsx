import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

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
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-background border-b border-border",
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate({ to: "/" });
            setMenuOpen(false);
          }}
          className="font-display text-lg font-bold tracking-widest text-foreground hover:opacity-70 transition-smooth cursor-pointer"
        >
          BEFIKR CO.
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  navigate({ to: href as "/" });
                }}
                className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-smooth cursor-pointer"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Cart + mobile toggle */}
        <div className="flex items-center gap-4">
          <a
            href="/cart"
            onClick={(e) => {
              e.preventDefault();
              navigate({ to: "/cart" });
            }}
            data-ocid="cart-icon"
            className="relative flex items-center hover:opacity-70 transition-smooth cursor-pointer"
            aria-label="Open cart"
          >
            <ShoppingBag size={20} className="text-foreground" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-foreground text-background text-[10px] font-bold flex items-center justify-center rounded-full">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </a>

          <button
            type="button"
            data-ocid="mobile-menu-toggle"
            className="md:hidden flex items-center justify-center text-foreground hover:opacity-70 transition-smooth"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          data-ocid="mobile-menu"
          className="md:hidden bg-background border-t border-border animate-fade-in"
        >
          <ul className="flex flex-col px-6 py-6 gap-6">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate({ to: href as "/" });
                    setMenuOpen(false);
                  }}
                  className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-smooth block cursor-pointer"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

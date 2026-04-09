import { ProductCard } from "@/components/ProductCard";
import { getBestSellers, getByCategory, getFeatured } from "@/data/products";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Zap } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

/* ─── Static data ─────────────────────────────────────────── */
const SHOWCASE_CATEGORIES = [
  {
    key: "T-Shirts" as const,
    label: "T-SHIRTS",
    desc: "Every weight. Every silhouette.",
    slug: "T-Shirts",
    accent: "#CCFF00",
    glow: "0 0 0 2px rgba(204,255,0,0.7), 0 0 32px rgba(204,255,0,0.25)",
  },
  {
    key: "Hoodies" as const,
    label: "HOODIES",
    desc: "Built for the cold and the chill.",
    slug: "Hoodies",
    accent: "#00D9FF",
    glow: "0 0 0 2px rgba(0,217,255,0.7), 0 0 32px rgba(0,217,255,0.25)",
  },
  {
    key: "Drops" as const,
    label: "DROPS",
    desc: "Limited. Intentional. Gone soon.",
    slug: "Drops",
    accent: "#FF006B",
    glow: "0 0 0 2px rgba(255,0,107,0.7), 0 0 32px rgba(255,0,107,0.25)",
  },
];

const MARQUEE_WORDS = [
  { text: "LIMITED DROPS.", color: "#CCFF00" },
  { text: "UNLIMITED MINDSET.", color: "#00D9FF" },
  { text: "GET YOURS NOW.", color: "#FF006B" },
  { text: "STACK THE DRIP.", color: "#FF8C00" },
  { text: "LEVEL UP DAILY.", color: "#CCFF00" },
  { text: "STAY BEFIKR.", color: "#00D9FF" },
];

/* ─── Glitch text hook ─────────────────────────────────────── */
function useGlitch() {
  const [glitching, setGlitching] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGlitching(true), 600);
    const t2 = setTimeout(() => setGlitching(false), 1000);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);
  return glitching;
}

/* ─── Geo accent shapes ─────────────────────────────────────── */
function GeometricAccents() {
  return (
    <>
      {/* Top-left corner lines */}
      <div className="absolute top-10 left-10 pointer-events-none">
        <div
          style={{ width: 60, height: 1, background: "rgba(204,255,0,0.5)" }}
        />
        <div
          style={{
            width: 1,
            height: 60,
            background: "rgba(204,255,0,0.5)",
            marginTop: -1,
          }}
        />
      </div>
      {/* Top-right corner lines */}
      <div className="absolute top-10 right-10 pointer-events-none flex flex-col items-end">
        <div
          style={{ width: 60, height: 1, background: "rgba(0,217,255,0.5)" }}
        />
        <div
          style={{
            width: 1,
            height: 60,
            background: "rgba(0,217,255,0.5)",
            marginTop: -1,
          }}
        />
      </div>
      {/* Bottom-left */}
      <div className="absolute bottom-20 left-10 pointer-events-none flex flex-col">
        <div
          style={{ width: 1, height: 40, background: "rgba(255,0,107,0.4)" }}
        />
        <div
          style={{ width: 40, height: 1, background: "rgba(255,0,107,0.4)" }}
        />
      </div>
      {/* Floating diamond — right center */}
      <div
        className="absolute right-[8%] top-[30%] pointer-events-none"
        style={{ animation: "float 4s ease-in-out infinite" }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            border: "2px solid rgba(0,217,255,0.7)",
            transform: "rotate(45deg)",
            boxShadow: "0 0 12px rgba(0,217,255,0.6)",
          }}
        />
      </div>
      {/* Floating circle — left upper */}
      <div
        className="absolute left-[12%] top-[25%] pointer-events-none hidden md:block"
        style={{ animation: "float 5s 1s ease-in-out infinite" }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#CCFF00",
            boxShadow: "0 0 16px rgba(204,255,0,0.9)",
          }}
        />
      </div>
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(204,255,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(204,255,0,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          animation: "pulse-glow 6s ease-in-out infinite",
        }}
      />
    </>
  );
}

/* ─── Page component ────────────────────────────────────────── */
export default function HomePage() {
  const featured = getFeatured().slice(0, 4);
  const bestSellers = getBestSellers().slice(0, 4);
  const navigate = useNavigate();
  const glitching = useGlitch();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <div className="bg-background overflow-x-hidden">
      {/* ─────────────────────────────────────────────────────
          1. HERO — 100vh fullscreen
         ───────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[100dvh] flex items-center overflow-hidden"
        style={{ background: "#000" }}
      >
        {/* Radial neon ambience */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(204,255,0,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 40%, rgba(255,0,107,0.06) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 50% 90%, rgba(0,217,255,0.05) 0%, transparent 60%)",
          }}
        />
        <GeometricAccents />

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 w-full max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24 py-20"
        >
          {/* Pre-label */}
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] tracking-[0.25em] uppercase font-semibold"
              style={{
                border: "1px solid rgba(204,255,0,0.4)",
                color: "#CCFF00",
                background: "rgba(204,255,0,0.06)",
                boxShadow: "0 0 12px rgba(204,255,0,0.2)",
              }}
            >
              <Zap size={10} fill="#CCFF00" />
              SS26 Collection Live
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          >
            <h1
              className="font-display leading-[0.85] tracking-[-0.03em] mb-6"
              style={{
                fontSize: "clamp(5rem,15vw,14rem)",
                fontWeight: 900,
                color: "#F5F5F5",
                animation: glitching ? "glitch 0.4s ease-in-out" : undefined,
              }}
            >
              STAY
              <br />
              <span
                style={{
                  WebkitTextStroke: "2px #CCFF00",
                  color: "transparent",
                  textShadow: "0 0 30px rgba(204,255,0,0.4)",
                }}
              >
                BEFIKR.
              </span>
            </h1>
          </motion.div>

          {/* Sub tagline */}
          <motion.p
            className="font-display text-lg md:text-2xl font-bold mb-10 max-w-xl leading-snug"
            style={{
              background: "linear-gradient(135deg, #CCFF00 0%, #FF006B 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.45,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            Get the bag. Stack the drip.
            <br />
            Live on your terms.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.65,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            <button
              type="button"
              onClick={() => navigate({ to: "/shop" })}
              data-ocid="hero-cta-shop"
              className="group inline-flex items-center gap-3 px-8 py-4 font-display font-bold text-sm tracking-[0.12em] uppercase transition-smooth"
              style={{
                background: "#CCFF00",
                color: "#000",
                boxShadow:
                  "0 0 20px rgba(204,255,0,0.5), 0 0 60px rgba(204,255,0,0.2)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 32px rgba(204,255,0,0.9), 0 0 80px rgba(204,255,0,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 20px rgba(204,255,0,0.5), 0 0 60px rgba(204,255,0,0.2)";
              }}
            >
              SHOP NOW
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </button>

            <button
              type="button"
              onClick={() =>
                navigate({ to: "/shop", search: { category: "Drops" } })
              }
              data-ocid="hero-cta-drops"
              className="group inline-flex items-center gap-3 px-8 py-4 font-display font-bold text-sm tracking-[0.12em] uppercase transition-smooth"
              style={{
                color: "#FF006B",
                border: "1.5px solid rgba(255,0,107,0.6)",
                background: "rgba(255,0,107,0.06)",
                boxShadow: "0 0 16px rgba(255,0,107,0.3)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 28px rgba(255,0,107,0.7), 0 0 60px rgba(0,217,255,0.2)";
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "rgba(0,217,255,0.7)";
                (e.currentTarget as HTMLButtonElement).style.color = "#00D9FF";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 16px rgba(255,0,107,0.3)";
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "rgba(255,0,107,0.6)";
                (e.currentTarget as HTMLButtonElement).style.color = "#FF006B";
              }}
            >
              EXPLORE DROPS
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </button>
          </motion.div>

          {/* Floating money mindset badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 1.1,
              type: "spring",
              stiffness: 200,
            }}
            className="inline-flex"
          >
            <div
              className="flex items-center gap-2 px-4 py-2 font-display font-bold text-xs tracking-[0.2em] uppercase"
              style={{
                border: "1px solid rgba(255,140,0,0.6)",
                color: "#FF8C00",
                background: "rgba(255,140,0,0.08)",
                boxShadow: "0 0 16px rgba(255,140,0,0.35)",
                animation: "bounce-neon 2s 2s ease-in-out infinite",
              }}
            >
              <span style={{ animation: "float 3s ease-in-out infinite" }}>
                💰
              </span>
              LEVEL UP DAILY
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <div
            className="w-px h-12"
            style={{
              background:
                "linear-gradient(to bottom, rgba(204,255,0,0.7), transparent)",
              animation: "pulse-glow 2s ease-in-out infinite",
            }}
          />
          <span
            className="font-body text-[9px] tracking-[0.25em] uppercase"
            style={{ color: "rgba(204,255,0,0.45)" }}
          >
            Scroll
          </span>
        </motion.div>
      </section>

      {/* ─────────────────────────────────────────────────────
          2. FEATURED DROP
         ───────────────────────────────────────────────────── */}
      <section className="py-28 md:py-36" style={{ background: "#000" }}>
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            >
              <p
                className="font-body text-[10px] tracking-[0.35em] uppercase mb-3 font-semibold"
                style={{ color: "rgba(204,255,0,0.6)" }}
              >
                — New Season
              </p>
              <h2
                className="font-display font-black leading-none tracking-[-0.02em]"
                style={{
                  fontSize: "clamp(2.8rem,6vw,5.5rem)",
                  background:
                    "linear-gradient(135deg, #F5F5F5 30%, rgba(204,255,0,0.8) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                FEATURED DROP
              </h2>
              <p
                className="font-display text-base md:text-lg font-semibold italic mt-2"
                style={{ color: "rgba(204,255,0,0.5)" }}
              >
                Drip or drown.
              </p>
            </motion.div>

            <motion.button
              type="button"
              onClick={() => navigate({ to: "/shop" })}
              data-ocid="featured-view-all"
              className="group inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-semibold transition-smooth hidden md:flex"
              style={{ color: "rgba(204,255,0,0.65)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ color: "#CCFF00" } as never}
            >
              View All
              <ArrowRight
                size={12}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </motion.button>
          </div>

          {/* Neon divider */}
          <div className="neon-divider-lime mb-12 opacity-50" />

          {/* Product grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featured.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          3. BEST SELLERS
         ───────────────────────────────────────────────────── */}
      <section
        className="py-28 md:py-36"
        style={{
          background: "linear-gradient(180deg, #0a0a0a 0%, #050505 100%)",
        }}
      >
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            >
              <p
                className="font-body text-[10px] tracking-[0.35em] uppercase mb-3 font-semibold"
                style={{ color: "rgba(0,217,255,0.6)" }}
              >
                — Community Picks
              </p>
              <h2
                className="font-display font-black leading-none tracking-[-0.02em] relative inline-block"
                style={{
                  fontSize: "clamp(2.8rem,6vw,5.5rem)",
                  color: "#F5F5F5",
                }}
              >
                BEST SELLERS
                {/* Animated underline */}
                <motion.span
                  className="absolute -bottom-2 left-0 h-[3px] rounded-full"
                  style={{
                    background: "#CCFF00",
                    boxShadow: "0 0 12px rgba(204,255,0,0.9)",
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: 0.4,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                />
              </h2>
              <p
                className="font-display text-base md:text-lg font-semibold italic mt-4"
                style={{ color: "rgba(0,217,255,0.5)" }}
              >
                Stack your fits. Own the moment.
              </p>
            </motion.div>

            <motion.button
              type="button"
              onClick={() => navigate({ to: "/shop" })}
              data-ocid="bestsellers-view-all"
              className="group inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-semibold transition-smooth hidden md:flex"
              style={{ color: "rgba(0,217,255,0.65)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              See More
              <ArrowRight
                size={12}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </motion.button>
          </div>

          <div className="neon-divider-cyan mb-12 opacity-40" />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {bestSellers.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          4. CATEGORY SHOWCASE
         ───────────────────────────────────────────────────── */}
      <section className="py-28 md:py-36" style={{ background: "#000" }}>
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p
              className="font-body text-[10px] tracking-[0.35em] uppercase mb-3 font-semibold"
              style={{ color: "rgba(255,0,107,0.6)" }}
            >
              — Explore
            </p>
            <h2
              className="font-display font-black leading-none tracking-[-0.02em]"
              style={{
                fontSize: "clamp(2.8rem,6vw,5.5rem)",
                background:
                  "linear-gradient(135deg, #F5F5F5 20%, rgba(255,0,107,0.9) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              SHOP THE LOOK
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {SHOWCASE_CATEGORIES.map((cat, i) => {
              const count = getByCategory(cat.key).length;
              return (
                <motion.button
                  key={cat.key}
                  type="button"
                  onClick={() =>
                    navigate({ to: "/shop", search: { category: cat.slug } })
                  }
                  data-ocid={`category-${cat.key.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group relative text-left overflow-hidden"
                  style={{
                    padding: "clamp(2rem,4vw,3.5rem)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    background: "rgba(255,255,255,0.02)",
                    transition:
                      "box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease",
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.55,
                    delay: i * 0.12,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.boxShadow = cat.glow;
                    el.style.borderColor = `${cat.accent}80`;
                    el.style.background = `${cat.accent}08`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.boxShadow = "none";
                    el.style.borderColor = "rgba(255,255,255,0.07)";
                    el.style.background = "rgba(255,255,255,0.02)";
                  }}
                >
                  {/* Index number */}
                  <span
                    className="absolute top-6 right-6 font-display text-[11px] tracking-[0.15em] font-bold transition-smooth"
                    style={{ color: "rgba(255,255,255,0.15)" }}
                  >
                    0{i + 1}
                  </span>

                  {/* Accent dot */}
                  <div
                    className="w-2 h-2 rounded-full mb-6"
                    style={{
                      background: cat.accent,
                      boxShadow: `0 0 10px ${cat.accent}`,
                    }}
                  />

                  <p
                    className="font-body text-[9px] tracking-[0.3em] uppercase font-semibold mb-3"
                    style={{ color: `${cat.accent}99` }}
                  >
                    {count} Items
                  </p>
                  <h3
                    className="font-display font-black leading-none tracking-[-0.01em] mb-4 transition-smooth"
                    style={{
                      fontSize: "clamp(2rem,4vw,3rem)",
                      color: "#F5F5F5",
                    }}
                  >
                    {cat.label}
                  </h3>
                  <p
                    className="font-body text-xs leading-relaxed mb-8"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    {cat.desc}
                  </p>

                  <div
                    className="flex items-center gap-2 font-body text-[10px] tracking-[0.25em] uppercase font-semibold transition-smooth"
                    style={{ color: cat.accent }}
                  >
                    Shop Now
                    <ArrowRight
                      size={11}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          5. MANIFESTO MARQUEE STRIP
         ───────────────────────────────────────────────────── */}
      <section
        className="py-10 overflow-hidden relative"
        style={{
          background: "rgba(204,255,0,0.03)",
          borderTop: "1px solid rgba(204,255,0,0.15)",
          borderBottom: "1px solid rgba(204,255,0,0.15)",
        }}
      >
        {/* Marquee track — duplicated for seamless loop */}
        <div
          className="flex gap-12 whitespace-nowrap items-center"
          style={{ animation: "marquee 18s linear infinite" }}
        >
          {[...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS].map(
            (w, i) => (
              <span
                key={`${w.text}-${i}`}
                className="font-display font-black text-2xl md:text-3xl tracking-[0.1em] uppercase flex-shrink-0"
                style={{
                  color: w.color,
                  textShadow: `0 0 20px ${w.color}88`,
                }}
              >
                {w.text}
                <span
                  className="mx-6 inline-block"
                  style={{
                    color: "rgba(255,255,255,0.15)",
                    fontSize: "0.5em",
                    verticalAlign: "middle",
                  }}
                >
                  ✦
                </span>
              </span>
            ),
          )}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          6. MANIFESTO / BRAND STATEMENT
         ───────────────────────────────────────────────────── */}
      <section className="py-28 md:py-40" style={{ background: "#000" }}>
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-4xl"
          >
            <p
              className="font-body text-[9px] tracking-[0.35em] uppercase font-semibold mb-8"
              style={{ color: "rgba(255,140,0,0.6)" }}
            >
              — The Befikr Way
            </p>

            <blockquote
              className="font-display font-black leading-[1.0] tracking-[-0.02em] mb-10"
              style={{
                fontSize: "clamp(2.5rem,6.5vw,6rem)",
                color: "#F5F5F5",
              }}
            >
              Confidence.{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #CCFF00, #00D9FF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Comfort.
              </span>
              <br />
              No overthinking.
            </blockquote>

            <div className="flex flex-wrap gap-4 items-center">
              <button
                type="button"
                onClick={() => navigate({ to: "/about" })}
                data-ocid="manifesto-about-cta"
                className="group inline-flex items-center gap-3 text-[11px] tracking-[0.25em] uppercase font-semibold transition-smooth"
                style={{ color: "rgba(255,255,255,0.45)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "#CCFF00";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "rgba(255,255,255,0.45)";
                }}
              >
                Our Story
                <ArrowRight
                  size={12}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </button>

              <div
                className="neon-divider-lime w-16 opacity-30"
                style={{ height: 1 }}
              />

              <button
                type="button"
                onClick={() => navigate({ to: "/shop" })}
                data-ocid="manifesto-shop-cta"
                className="group inline-flex items-center gap-3 text-[11px] tracking-[0.25em] uppercase font-semibold transition-smooth"
                style={{ color: "rgba(255,255,255,0.45)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "#FF006B";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "rgba(255,255,255,0.45)";
                }}
              >
                Shop Now
                <ArrowRight
                  size={12}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

import { useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion, useAnimation } from "motion/react";
import { useEffect, useRef } from "react";

const values = [
  {
    title: "UNBOTHERED",
    body: "While others chase trends, we set them. Real ones move in silence and let the drip speak. No explanation needed.",
    color: "lime" as const,
    glow: "card-hover-lime",
    accent: "var(--neon-lime)",
    num: "01",
  },
  {
    title: "MINIMAL",
    body: "Wealth is subtle. Every piece stripped to its purest form — because excess is for those who have something to prove.",
    color: "cyan" as const,
    glow: "card-hover-cyan",
    accent: "var(--neon-cyan)",
    num: "02",
  },
  {
    title: "INTENTIONAL",
    body: "We drop when it's ready, not when the market demands. Premium takes time. Patience is the real flex.",
    color: "pink" as const,
    glow: "card-hover-pink",
    accent: "var(--neon-pink)",
    num: "03",
  },
  {
    title: "LOCAL",
    body: "Made in India, worn worldwide. Rooted in culture, elevated by craft. Home is the original luxury.",
    color: "lime" as const,
    glow: "card-hover-lime",
    accent: "var(--neon-lime)",
    num: "04",
  },
];

function GlitchHeading() {
  const controls = useAnimation();

  useEffect(() => {
    const run = async () => {
      await controls.start({ opacity: 1, y: 0 });
      // glitch burst on mount
      await controls.start({
        x: [0, 4, -4, 3, -2, 0],
        skewX: [0, -2, 2, -1, 0],
        transition: { duration: 0.5, ease: "easeInOut" },
      });
    };
    run();
  }, [controls]);

  return (
    <motion.h1
      className="font-display text-[clamp(3.5rem,11vw,9rem)] font-black text-foreground leading-[0.88] tracking-tight"
      initial={{ opacity: 0, y: 32 }}
      animate={controls}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      style={{ fontWeight: 900 }}
    >
      WE ARE{" "}
      <span className="text-glow-lime" style={{ color: "var(--neon-lime)" }}>
        BEFIKR.
      </span>
    </motion.h1>
  );
}

export default function AboutPage() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* ── HERO ────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background py-32">
        {/* Background geometric accents */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 blur-[120px] pointer-events-none"
          style={{ background: "var(--neon-lime)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-8 blur-[100px] pointer-events-none"
          style={{ background: "var(--neon-pink)" }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#ccff00 1px, transparent 1px), linear-gradient(90deg, #ccff00 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <motion.p
            className="text-xs tracking-[0.3em] uppercase mb-6 font-semibold"
            style={{ color: "var(--neon-lime)" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            ✦ The Brand
          </motion.p>

          <GlitchHeading />

          <motion.p
            className="text-gradient-lime-pink font-display text-[clamp(1.1rem,2.5vw,2rem)] font-semibold mt-6 mb-10 max-w-xl leading-snug"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Carefree by choice. Elite by mindset.
          </motion.p>

          <motion.div
            className="neon-divider-lime w-32"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{ transformOrigin: "left" }}
          />

          {/* Floating badge */}
          <motion.div
            className="mt-12 inline-flex items-center gap-3 border px-5 py-3 text-xs tracking-widest uppercase font-bold"
            style={{
              borderColor: "rgba(204,255,0,0.3)",
              color: "var(--neon-lime)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span className="w-2 h-2 rounded-full bg-current pulse-glow" />
            Since 2023 · Made in India
          </motion.div>
        </div>
      </section>

      {/* ── BRAND STORY ────────────────────────────────── */}
      <section className="bg-background py-28 md:py-36" ref={sectionRef}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32 items-start">
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p
                className="text-xs tracking-[0.3em] uppercase mb-5 font-bold"
                style={{ color: "var(--neon-cyan)" }}
              >
                ✦ Our Story
              </p>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-black text-foreground leading-tight">
                Built for the ones who{" "}
                <span className="text-gradient-lime-pink">
                  never needed permission.
                </span>
              </h2>
              {/* Neon accent underline */}
              <div
                className="mt-6 h-0.5 w-24"
                style={{
                  background: "var(--neon-lime)",
                  boxShadow: "0 0 10px rgba(204,255,0,0.6)",
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <p className="text-foreground/70 leading-[1.95] text-lg mb-7">
                We started with a simple idea: make clothes that feel as good as
                they look. No gimmicks. No seasonal noise. Just quality pieces
                that earn their place in your wardrobe — and your legacy.
              </p>
              <p className="text-foreground/70 leading-[1.95] text-lg mb-7">
                The name Befikr — Hindi for "worry-free" — is both a brand
                philosophy and a way of life. We design for people who've
                stopped seeking validation. Who dress for themselves. Who move
                through the world knowing their worth.
              </p>
              <p className="text-foreground/70 leading-[1.95] text-lg">
                Every piece we create is made with care, cut with intention, and
                built to outlast every trend cycle that comes and goes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────── */}
      <section className="py-20 bg-card border-y border-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-border">
            {[
              { num: "10K+", label: "Community members" },
              { num: "50+", label: "Premium drops" },
              { num: "100%", label: "Made in India" },
              { num: "∞", label: "Money mindset" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="px-8 py-10 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p
                  className="font-display text-[clamp(2.5rem,5vw,4rem)] font-black leading-none mb-2"
                  style={{
                    color:
                      i % 2 === 0 ? "var(--neon-lime)" : "var(--neon-cyan)",
                  }}
                >
                  {stat.num}
                </p>
                <p className="text-xs tracking-widest uppercase text-foreground/40 font-semibold">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES GRID ────────────────────────────────── */}
      <section className="bg-background py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p
              className="text-xs tracking-[0.3em] uppercase mb-4 font-bold"
              style={{ color: "var(--neon-pink)" }}
            >
              ✦ What We Stand For
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-black text-foreground">
              The{" "}
              <span className="text-gradient-cyan-orange">Befikr Code.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                data-ocid={`value-card-${v.title.toLowerCase()}`}
                className={`${v.glow} border border-border p-10 relative overflow-hidden cursor-default`}
                style={{ background: "var(--card)" }}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
              >
                {/* Corner accent */}
                <div
                  className="absolute top-0 right-0 w-16 h-16 opacity-10"
                  style={{
                    background: `radial-gradient(circle at top right, ${v.accent}, transparent)`,
                  }}
                />

                <p
                  className="font-display text-[5rem] font-black leading-none opacity-10 absolute -bottom-4 -right-2 pointer-events-none select-none"
                  style={{ color: v.accent }}
                >
                  {v.num}
                </p>

                <p
                  className="text-[0.65rem] tracking-[0.3em] uppercase font-bold mb-5"
                  style={{ color: v.accent }}
                >
                  {v.num}
                </p>
                <h3
                  className="font-display text-xl font-black mb-4 leading-tight"
                  style={{ color: "var(--neon-lime)" }}
                >
                  {v.title}
                </h3>
                <p className="text-foreground/75 leading-relaxed text-sm">
                  {v.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MANIFESTO QUOTE ────────────────────────────── */}
      <section
        className="py-28 md:py-40 relative overflow-hidden"
        style={{ background: "#0a0a0a" }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, #ccff00 0px, #ccff00 1px, transparent 1px, transparent 60px)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none opacity-[0.07]"
          style={{ background: "var(--neon-cyan)" }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
          <motion.p
            className="text-xs tracking-[0.35em] uppercase mb-8 font-bold"
            style={{ color: "var(--neon-pink)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            ✦ The Manifesto
          </motion.p>
          <motion.blockquote
            className="font-display text-[clamp(1.6rem,4.5vw,4rem)] font-black text-foreground leading-tight"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            "Dress like you already made it.{" "}
            <span className="text-gradient-lime-pink">
              Move like you don't need to prove it.
            </span>
            "
          </motion.blockquote>
          <motion.p
            className="text-foreground/30 text-xs tracking-[0.3em] uppercase mt-8 font-semibold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            — Befikr Co., since day one
          </motion.p>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────── */}
      <section className="bg-background py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.h2
            className="font-display text-[clamp(2rem,5vw,4rem)] font-black text-foreground mb-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to stay{" "}
            <span
              className="text-glow-lime"
              style={{ color: "var(--neon-lime)" }}
            >
              Befikr?
            </span>
          </motion.h2>
          <motion.p
            className="text-foreground/50 text-lg mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            The collection is waiting. Your main character arc starts here.
          </motion.p>
          <motion.button
            type="button"
            data-ocid="about-shop-cta"
            onClick={() => navigate({ to: "/shop" })}
            className="inline-flex items-center gap-3 font-display font-black text-sm tracking-widest uppercase px-10 py-5 transition-glow group"
            style={{
              background: "var(--neon-lime)",
              color: "#000000",
            }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{
              scale: 1.04,
              boxShadow:
                "0 0 28px rgba(204,255,0,0.6), 0 0 60px rgba(204,255,0,0.3)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            Shop the Collection
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </motion.button>
        </div>
      </section>
    </div>
  );
}

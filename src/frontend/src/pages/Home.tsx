import { ProductCard } from "@/components/ProductCard";
import { getBestSellers, getByCategory, getFeatured } from "@/data/products";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const SHOWCASE_CATEGORIES = [
  {
    key: "T-Shirts" as const,
    label: "Tees",
    desc: "Every weight. Every silhouette.",
    slug: "T-Shirts",
  },
  {
    key: "Hoodies" as const,
    label: "Hoodies",
    desc: "Built for the cold and the chill.",
    slug: "Hoodies",
  },
  {
    key: "Drops" as const,
    label: "Drops",
    desc: "Limited. Intentional. Gone soon.",
    slug: "Drops",
  },
];

export default function HomePage() {
  const featured = getFeatured().slice(0, 4);
  const bestSellers = getBestSellers().slice(0, 4);
  const navigate = useNavigate();

  return (
    <div className="bg-background">
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[100dvh] flex items-end overflow-hidden bg-foreground">
        <img
          src="/assets/generated/hero-befikr.dim_1920x1080.jpg"
          alt="Befikr Co. — Stay Befikr"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        {/* Gradient: dark at bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000] via-[#00000066] to-transparent" />
        {/* Subtle top fade */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#00000060] to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-24 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.23, 1, 0.32, 1] }}
          >
            <p className="text-[#F5F5F5]/40 text-[10px] tracking-[0.3em] uppercase mb-6 font-body">
              Befikr Co. — SS26
            </p>
            <h1 className="font-display text-[clamp(4rem,12vw,10.5rem)] font-bold text-[#F5F5F5] leading-[0.88] tracking-[-0.02em] mb-8">
              Stay Befikr.
            </h1>
            <p className="text-[#F5F5F5]/55 text-sm md:text-base tracking-[0.12em] uppercase mb-12 max-w-xs leading-relaxed">
              Streetwear for the unbothered generation.
            </p>
            <button
              type="button"
              onClick={() => navigate({ to: "/shop" })}
              data-ocid="hero-cta"
              className="inline-flex items-center gap-3 border border-[#F5F5F5] text-[#F5F5F5] text-[10px] tracking-[0.25em] uppercase px-8 py-4 font-semibold hover:bg-[#F5F5F5] hover:text-[#000] transition-smooth group"
            >
              Shop Now
              <ArrowRight
                size={12}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </button>
          </motion.div>
        </div>

        {/* Bottom scroll hint */}
        <motion.div
          className="absolute bottom-8 right-12 hidden md:flex items-center gap-2 text-[#F5F5F5]/30 text-[9px] tracking-[0.2em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <span>Scroll</span>
          <div className="w-8 h-px bg-[#F5F5F5]/30" />
        </motion.div>
      </section>

      {/* ─── Featured Drops ───────────────────────────────────────── */}
      <section className="bg-background py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <p className="text-muted-foreground text-[10px] tracking-[0.25em] uppercase mb-2">
                New Season
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Featured Drops
              </h2>
            </motion.div>
            <motion.button
              type="button"
              onClick={() => navigate({ to: "/shop" })}
              className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-smooth hidden md:flex items-center gap-2 group"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              data-ocid="featured-view-all"
            >
              View All{" "}
              <ArrowRight
                size={11}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </motion.button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featured.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.09,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Best Sellers ─────────────────────────────────────────── */}
      <section className="bg-muted/25 py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <p className="text-muted-foreground text-[10px] tracking-[0.25em] uppercase mb-2">
                Community Favourites
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Best Sellers
              </h2>
            </motion.div>
            <motion.button
              type="button"
              onClick={() => navigate({ to: "/shop" })}
              className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-smooth hidden md:flex items-center gap-2 group"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              data-ocid="bestsellers-view-all"
            >
              See More{" "}
              <ArrowRight
                size={11}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </motion.button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {bestSellers.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.09,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Category Showcase ────────────────────────────────────── */}
      <section className="bg-background py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-muted-foreground text-[10px] tracking-[0.25em] uppercase mb-2">
              Explore
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Shop by Category
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
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
                  className="group relative bg-background text-left p-10 md:p-12 hover:bg-foreground transition-smooth overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  {/* Corner index */}
                  <span className="absolute top-6 right-6 text-[10px] tracking-[0.15em] text-muted-foreground group-hover:text-background/40 transition-smooth">
                    0{i + 1}
                  </span>

                  <p className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-4 group-hover:text-background/50 transition-smooth">
                    {count} Items
                  </p>
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground group-hover:text-background leading-none mb-3 transition-smooth">
                    {cat.label}
                  </h3>
                  <p className="text-xs text-muted-foreground group-hover:text-background/55 transition-smooth leading-relaxed mb-8">
                    {cat.desc}
                  </p>

                  <div className="flex items-center gap-2 text-[9px] tracking-[0.25em] uppercase text-muted-foreground group-hover:text-background/70 transition-smooth">
                    <span>Shop Now</span>
                    <ArrowRight
                      size={10}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Manifesto Strip ──────────────────────────────────────── */}
      <section className="bg-foreground py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <p className="text-background/35 text-[9px] tracking-[0.3em] uppercase mb-6">
              The Befikr Way
            </p>
            <blockquote className="font-display text-[clamp(1.75rem,4.5vw,3.5rem)] font-bold text-background leading-[1.1] tracking-tight">
              "Confidence, comfort,
              <br />
              and not overthinking life."
            </blockquote>
            <div className="mt-10">
              <button
                type="button"
                onClick={() => navigate({ to: "/about" })}
                data-ocid="manifesto-about-cta"
                className="inline-flex items-center gap-3 text-background/50 text-[10px] tracking-[0.25em] uppercase hover:text-background transition-smooth group"
              >
                Our Story
                <ArrowRight
                  size={11}
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

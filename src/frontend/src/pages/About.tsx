import { useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const values = [
  {
    title: "Unbothered",
    body: "We build for people who don't overthink. Life is too short for bad fits and worse energy.",
  },
  {
    title: "Minimal",
    body: "Every detail has a reason. We strip back what doesn't serve the piece, then stop.",
  },
  {
    title: "Intentional",
    body: "We drop when we're ready, not when the calendar says. Quality over quantity, always.",
  },
  {
    title: "Local",
    body: "Made in India. Worn everywhere. We take pride in where we're from.",
  },
];

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden bg-foreground min-h-[50vh] flex items-end">
        <img
          src="/assets/generated/about-befikr.dim_1200x600.jpg"
          alt="Befikr Co. — The Brand"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          <motion.p
            className="text-background/40 text-xs tracking-widest uppercase mb-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            The Brand
          </motion.p>
          <motion.h1
            className="font-display text-[clamp(3rem,8vw,7rem)] font-bold text-background leading-[0.9]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About Us.
          </motion.h1>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">
                Our Story
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">
                Befikr Co. is about confidence, comfort, and not overthinking
                life.
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <p className="text-muted-foreground leading-loose text-sm mb-5">
                We started with a simple idea: make clothes that feel as good as
                they look. No gimmicks. No seasonal noise. Just quality pieces
                that earn their place in your wardrobe and stay there.
              </p>
              <p className="text-muted-foreground leading-loose text-sm mb-5">
                The name Befikr — Hindi for "worry-free" — is both a brand
                philosophy and a way of life. We design for people who've
                stopped seeking validation. Who dress for themselves. Who move
                through the world with quiet confidence.
              </p>
              <p className="text-muted-foreground leading-loose text-sm">
                Every piece we create is made with care, cut with intention, and
                built to last through all the seasons of your life.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            What We Stand For
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 divide-y md:divide-y-0 md:divide-x divide-border border border-border">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                className="p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">
                  0{i + 1}
                </p>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  {v.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {v.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-foreground py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.blockquote
            className="font-display text-[clamp(1.5rem,4vw,3.5rem)] font-bold text-background leading-tight max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            "Dress well. Move quietly. Let the clothes do the talking."
          </motion.blockquote>
          <motion.p
            className="text-background/40 text-xs tracking-widest uppercase mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            — Befikr Co., since day one
          </motion.p>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-6">
            Ready to stay Befikr?
          </h2>
          <button
            type="button"
            onClick={() => navigate({ to: "/shop" })}
            className="inline-flex items-center gap-2 bg-foreground text-background text-xs tracking-widest uppercase px-8 py-4 font-semibold hover:opacity-80 transition-smooth group"
          >
            Shop the Collection
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </button>
        </div>
      </section>
    </div>
  );
}

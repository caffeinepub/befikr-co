import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getByCategory, getById } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { useNavigate, useParams } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const GLOW_COLORS = [
  {
    border: "rgba(204,255,0,0.8)",
    shadow:
      "0 0 0 2px rgba(204,255,0,0.6), 0 0 32px rgba(204,255,0,0.45), 0 0 64px rgba(204,255,0,0.2)",
    badge: "#ccff00",
    badgeText: "#000",
    thumbShadow: "0 0 0 2px #ccff00, 0 0 12px rgba(204,255,0,0.6)",
    sizeBg: "#ccff00",
    sizeText: "#000",
    sizeShadow: "0 0 0 2px #ccff00, 0 0 16px rgba(204,255,0,0.7)",
  },
  {
    border: "rgba(0,217,255,0.8)",
    shadow:
      "0 0 0 2px rgba(0,217,255,0.6), 0 0 32px rgba(0,217,255,0.45), 0 0 64px rgba(0,217,255,0.2)",
    badge: "#00d9ff",
    badgeText: "#000",
    thumbShadow: "0 0 0 2px #00d9ff, 0 0 12px rgba(0,217,255,0.6)",
    sizeBg: "#00d9ff",
    sizeText: "#000",
    sizeShadow: "0 0 0 2px #00d9ff, 0 0 16px rgba(0,217,255,0.7)",
  },
  {
    border: "rgba(255,0,107,0.8)",
    shadow:
      "0 0 0 2px rgba(255,0,107,0.6), 0 0 32px rgba(255,0,107,0.45), 0 0 64px rgba(255,0,107,0.2)",
    badge: "#ff006b",
    badgeText: "#fff",
    thumbShadow: "0 0 0 2px #ff006b, 0 0 12px rgba(255,0,107,0.6)",
    sizeBg: "#ff006b",
    sizeText: "#fff",
    sizeShadow: "0 0 0 2px #ff006b, 0 0 16px rgba(255,0,107,0.7)",
  },
  {
    border: "rgba(255,140,0,0.8)",
    shadow:
      "0 0 0 2px rgba(255,140,0,0.6), 0 0 32px rgba(255,140,0,0.45), 0 0 64px rgba(255,140,0,0.2)",
    badge: "#ff8c00",
    badgeText: "#000",
    thumbShadow: "0 0 0 2px #ff8c00, 0 0 12px rgba(255,140,0,0.6)",
    sizeBg: "#ff8c00",
    sizeText: "#000",
    sizeShadow: "0 0 0 2px #ff8c00, 0 0 16px rgba(255,140,0,0.7)",
  },
];

function hashId(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return h % GLOW_COLORS.length;
}

export default function ProductPage() {
  const { id } = useParams({ strict: false }) as { id: string };
  const navigate = useNavigate();
  const product = getById(id);
  const addItem = useCartStore((s) => s.addItem);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [activeImage, setActiveImage] = useState(0);
  const [sizeError, setSizeError] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8 px-4 fade-in">
        <p className="text-xs tracking-widest uppercase text-muted-foreground">
          404 — Not Found
        </p>
        <h1
          className="font-display text-5xl md:text-7xl font-black tracking-tight text-center"
          style={{ textShadow: "0 0 40px rgba(204,255,0,0.3)" }}
        >
          <span className="text-gradient-lime-pink">Lost in the</span>
          <br />
          <span className="text-foreground">Drip Zone.</span>
        </h1>
        <p className="text-muted-foreground text-sm max-w-xs text-center leading-loose">
          This piece doesn't exist or may have dropped already. Browse the full
          collection below.
        </p>
        <Button
          variant="outline"
          className="rounded-none font-display font-bold text-xs tracking-widest uppercase px-10 py-6 h-auto transition-glow"
          style={{ borderColor: "#ccff00", color: "#ccff00" }}
          onClick={() => navigate({ to: "/shop" })}
          data-ocid="not-found-shop-cta"
        >
          Back to Shop
        </Button>
      </div>
    );
  }

  const glow = GLOW_COLORS[hashId(product.id)];

  const rawImages =
    product.images.length > 0
      ? product.images
      : ["/assets/images/placeholder.svg"];
  const gallery =
    rawImages.length >= 3
      ? rawImages
      : Array.from({ length: 3 }, (_, i) => rawImages[i % rawImages.length]);

  const related = getByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      toast.error("Select your size first.", {
        style: {
          background: "#0d0d0d",
          color: "#ff006b",
          border: "1px solid #ff006b",
          borderRadius: "0",
        },
      });
      return;
    }
    setSizeError(false);
    setCartBounce(true);
    setTimeout(() => setCartBounce(false), 600);
    addItem(product, selectedSize);
    toast.success(`🔥 ${product.name} / ${selectedSize} — added to bag`, {
      style: {
        background: "#0d0d0d",
        color: "#ccff00",
        border: "1px solid #ccff00",
        borderRadius: "0",
      },
    });
  };

  return (
    <div className="bg-background fade-in">
      {/* Breadcrumb */}
      <div className="border-b border-border/50 px-6 md:px-16 py-4">
        <p className="text-[11px] tracking-widest uppercase text-muted-foreground">
          <button
            type="button"
            onClick={() => navigate({ to: "/" })}
            className="hover:text-foreground transition-smooth"
          >
            Home
          </button>
          <span className="mx-3 opacity-30">/</span>
          <button
            type="button"
            onClick={() => navigate({ to: "/shop" })}
            className="hover:text-foreground transition-smooth"
          >
            Shop
          </button>
          <span className="mx-3 opacity-30">/</span>
          <span className="truncate" style={{ color: glow.badge }}>
            {product.name}
          </span>
        </p>
      </div>

      {/* ── Main Product Hero ── */}
      <section className="px-6 md:px-16 pt-16 pb-24 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-28">
          {/* ── Left — Image Gallery ── */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, scale: 0.96, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Main image with neon glow frame */}
            <div
              className="relative overflow-hidden"
              style={{
                aspectRatio: "3/4",
                boxShadow: glow.shadow,
                border: `1.5px solid ${glow.border}`,
              }}
              data-ocid="product-main-image"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={gallery[activeImage]}
                  alt={`${product.name} — view ${activeImage + 1}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>

              {product.tag && (
                <span
                  className="absolute top-4 left-4 text-[10px] tracking-widest uppercase font-display font-bold px-3 py-1"
                  style={{
                    background: glow.badge,
                    color: glow.badgeText,
                    boxShadow: `0 0 12px ${glow.badge}`,
                  }}
                >
                  {product.tag}
                </span>
              )}

              {/* Corner accent decoration */}
              <div
                className="absolute bottom-0 right-0 w-16 h-16 opacity-30"
                style={{
                  background: `linear-gradient(135deg, transparent 50%, ${glow.badge} 50%)`,
                }}
              />
            </div>

            {/* Thumbnail row */}
            <div className="flex gap-3" data-ocid="product-thumbnails">
              {gallery.map((src, i) => (
                <button
                  key={`thumb-${i}-${src}`}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  data-ocid={`product-thumb-${i}`}
                  className="flex-1 overflow-hidden transition-glow"
                  style={{
                    aspectRatio: "1/1",
                    border: "1.5px solid",
                    borderColor:
                      activeImage === i ? glow.badge : "rgba(255,255,255,0.1)",
                    boxShadow: activeImage === i ? glow.thumbShadow : "none",
                    opacity: activeImage === i ? 1 : 0.5,
                  }}
                >
                  <img
                    src={src}
                    alt={`${product.name} thumbnail ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* ── Right — Product Info ── */}
          <motion.div
            className="flex flex-col pt-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.12,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            {/* Category badge */}
            <div className="mb-5">
              <span
                className="text-[10px] tracking-widest uppercase font-display font-bold px-3 py-1.5"
                style={{
                  background: `${glow.badge}20`,
                  color: glow.badge,
                  border: `1px solid ${glow.badge}50`,
                }}
              >
                {product.category}
              </span>
            </div>

            {/* Title */}
            <h1
              className="font-display text-4xl md:text-5xl lg:text-[3.25rem] font-black leading-[1.1] tracking-tight mb-5"
              data-ocid="product-title"
            >
              {product.name}
            </h1>

            {/* Price */}
            <p
              className="font-display font-black text-4xl mb-3 text-glow-lime"
              style={{ color: "#ccff00" }}
              data-ocid="product-price"
            >
              ₹{product.price}
            </p>
            <p className="text-[11px] tracking-widest uppercase text-muted-foreground mb-8">
              inclusive of all taxes
            </p>

            {/* Neon divider */}
            <div className="neon-divider-lime mb-8 opacity-60" />

            {/* Description */}
            <p
              className="text-sm text-muted-foreground leading-[1.9] mb-10 max-w-sm"
              data-ocid="product-description"
            >
              {product.description}
            </p>

            {/* Size selector */}
            <div className="mb-10" data-ocid="product-size-selector">
              <div className="flex items-center justify-between mb-4">
                <p
                  className="text-xs tracking-widest uppercase font-display font-bold"
                  style={{
                    color: "#00d9ff",
                    textShadow: "0 0 10px rgba(0,217,255,0.6)",
                  }}
                >
                  Select Your Size
                </p>
                {sizeError && (
                  <p
                    className="text-xs font-display font-bold italic tracking-wide"
                    style={{ color: "#ff006b" }}
                  >
                    Pick a size!
                  </p>
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize === String(size);
                  return (
                    <motion.button
                      key={String(size)}
                      type="button"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedSize(String(size));
                        setSizeError(false);
                      }}
                      data-ocid={`size-btn-${size}`}
                      className="min-w-[56px] h-12 px-4 text-xs tracking-widest uppercase font-display font-bold transition-glow"
                      style={
                        isSelected
                          ? {
                              background: glow.sizeBg,
                              color: glow.sizeText,
                              border: `1.5px solid ${glow.badge}`,
                              boxShadow: glow.sizeShadow,
                            }
                          : {
                              background: "transparent",
                              color: sizeError
                                ? "#ff006b"
                                : "rgba(255,255,255,0.75)",
                              border: `1.5px solid ${sizeError ? "#ff006b" : "rgba(255,255,255,0.2)"}`,
                            }
                      }
                    >
                      {String(size)}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Add to Cart CTA */}
            <motion.button
              type="button"
              onClick={handleAddToCart}
              data-ocid="add-to-cart-btn"
              animate={
                cartBounce ? { scale: [1, 1.04, 0.97, 1.02, 1] } : { scale: 1 }
              }
              transition={{ duration: 0.45 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full font-display font-black text-sm tracking-widest uppercase py-6 mb-4 transition-glow"
              style={{
                background: "#ccff00",
                color: "#000",
                boxShadow:
                  "0 0 24px rgba(204,255,0,0.55), 0 0 56px rgba(204,255,0,0.25)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 36px rgba(204,255,0,0.85), 0 0 80px rgba(204,255,0,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 24px rgba(204,255,0,0.55), 0 0 56px rgba(204,255,0,0.25)";
              }}
            >
              🛒 Add to Bag
            </motion.button>

            {/* Shipping note */}
            <p className="text-[11px] text-muted-foreground text-center tracking-wide leading-relaxed mb-10">
              🚀 Free delivery above ₹2,000 &nbsp;·&nbsp; 14-day returns
            </p>

            {/* Product details grid */}
            <div
              className="pt-8 grid grid-cols-2 gap-x-8 gap-y-5 text-xs"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
              {[
                ["Material", "Premium cotton / nylon blend"],
                ["Fit", "Oversized / relaxed"],
                ["Care", "Cold wash. Do not tumble dry."],
                ["Origin", "Designed in India 🇮🇳"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p
                    className="tracking-widest uppercase mb-1.5 font-display font-bold text-[10px]"
                    style={{ color: glow.badge }}
                  >
                    {label}
                  </p>
                  <p className="text-foreground leading-relaxed opacity-80">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Related Products ── */}
      {related.length > 0 && (
        <section
          className="px-6 md:px-16 py-20 md:py-28"
          style={{
            background:
              "linear-gradient(180deg, #000 0%, #0a0a0a 50%, #000 100%)",
          }}
        >
          <div className="max-w-screen-xl mx-auto">
            {/* Section header */}
            <motion.div
              className="mb-14"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-3 font-display">
                Keep the heat going
              </p>
              <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight text-gradient-lime-cyan">
                You Might Also Drip
              </h2>
              <div className="neon-divider-cyan mt-5 w-48 opacity-70" />
            </motion.div>

            {/* Related grid */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7"
              data-ocid="related-products"
            >
              {related.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.55,
                    delay: i * 0.1,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

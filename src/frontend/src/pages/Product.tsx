import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getByCategory, getById } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { useNavigate, useParams } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export default function ProductPage() {
  const { id } = useParams({ strict: false }) as { id: string };
  const navigate = useNavigate();
  const product = getById(id);
  const addItem = useCartStore((s) => s.addItem);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [activeImage, setActiveImage] = useState(0);
  const [sizeError, setSizeError] = useState(false);

  // 404 state
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 px-4 fade-in">
        <p className="text-xs tracking-widest uppercase text-muted-foreground">
          404 — Not Found
        </p>
        <h1 className="font-display text-4xl md:text-6xl text-foreground tracking-tight text-center">
          Product not found.
        </h1>
        <p className="text-muted-foreground text-sm max-w-xs text-center leading-loose">
          This product doesn't exist or may have sold out. Browse the full
          collection below.
        </p>
        <Button
          variant="outline"
          className="rounded-none border-foreground text-foreground hover:bg-foreground hover:text-background transition-smooth text-xs tracking-widest uppercase px-8 py-5"
          onClick={() => navigate({ to: "/shop" })}
          data-ocid="not-found-shop-cta"
        >
          Back to Shop
        </Button>
      </div>
    );
  }

  // Build gallery: pad to at least 3 entries so the thumbnail row is populated
  const rawImages =
    product.images.length > 0
      ? product.images
      : ["/assets/images/placeholder.svg"];
  const gallery =
    rawImages.length >= 3
      ? rawImages
      : Array.from({ length: 3 }, (_, i) => rawImages[i % rawImages.length]);

  // Related products: same category, exclude current, up to 4
  const related = getByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      toast.error("Please select a size.", {
        style: {
          borderRadius: "0",
          background: "oklch(var(--card))",
          color: "oklch(var(--card-foreground))",
          border: "1px solid oklch(var(--border))",
        },
      });
      return;
    }
    setSizeError(false);
    addItem(product, selectedSize);
    toast.success(`Added to bag — ${product.name} / ${selectedSize}`, {
      style: {
        borderRadius: "0",
        background: "oklch(var(--card))",
        color: "oklch(var(--card-foreground))",
        border: "1px solid oklch(var(--border))",
      },
    });
  };

  return (
    <div className="bg-background fade-in">
      {/* Breadcrumb */}
      <div className="border-b border-border px-5 md:px-12 py-3">
        <p className="text-xs tracking-widest uppercase text-muted-foreground">
          <button
            type="button"
            onClick={() => navigate({ to: "/" })}
            className="hover:text-foreground transition-smooth"
          >
            Home
          </button>
          <span className="mx-2 opacity-40">/</span>
          <button
            type="button"
            onClick={() => navigate({ to: "/shop" })}
            className="hover:text-foreground transition-smooth"
          >
            Shop
          </button>
          <span className="mx-2 opacity-40">/</span>
          <span className="text-foreground truncate">{product.name}</span>
        </p>
      </div>

      {/* Main product layout */}
      <section className="px-5 md:px-12 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 max-w-6xl mx-auto">
          {/* ── Left — Image Gallery ── */}
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main image */}
            <div
              className="relative bg-muted overflow-hidden"
              style={{ aspectRatio: "3/4" }}
              data-ocid="product-main-image"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={gallery[activeImage]}
                  alt={`${product.name} — view ${activeImage + 1}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                />
              </AnimatePresence>
              {product.tag && (
                <Badge
                  variant="secondary"
                  className="absolute top-4 left-4 text-[10px] tracking-widest uppercase rounded-none px-2 py-0.5"
                >
                  {product.tag}
                </Badge>
              )}
            </div>

            {/* Thumbnail row */}
            <div className="flex gap-2" data-ocid="product-thumbnails">
              {gallery.map((src, i) => (
                <button
                  key={`thumb-${i}-${src}`}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  data-ocid={`product-thumb-${i}`}
                  className={`flex-1 overflow-hidden bg-muted border-b-2 transition-smooth ${
                    activeImage === i
                      ? "border-foreground"
                      : "border-transparent opacity-40 hover:opacity-70"
                  }`}
                  style={{ aspectRatio: "1/1" }}
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
            className="flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Category label */}
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">
              {product.category}
            </p>

            {/* Title */}
            <h1
              className="font-display text-3xl md:text-4xl lg:text-[2.75rem] text-foreground leading-tight tracking-tight mb-4"
              data-ocid="product-title"
            >
              {product.name}
            </h1>

            {/* Price */}
            <p
              className="text-2xl font-display font-semibold text-foreground mb-6"
              data-ocid="product-price"
            >
              ₹{product.price}
            </p>

            <div className="border-t border-border mb-6" />

            {/* Description */}
            <p
              className="text-sm text-muted-foreground leading-[1.8] mb-8 max-w-sm"
              data-ocid="product-description"
            >
              {product.description}
            </p>

            {/* Size selector */}
            <div className="mb-8" data-ocid="product-size-selector">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs tracking-widest uppercase font-medium text-foreground">
                  Select Size
                </p>
                {sizeError && (
                  <p className="text-xs text-destructive italic tracking-wide">
                    Required
                  </p>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={String(size)}
                    type="button"
                    onClick={() => {
                      setSelectedSize(String(size));
                      setSizeError(false);
                    }}
                    data-ocid={`size-btn-${size}`}
                    className={`min-w-[52px] h-11 px-3 text-xs tracking-widest uppercase border transition-smooth ${
                      selectedSize === String(size)
                        ? "border-foreground bg-foreground text-background"
                        : `text-foreground hover:border-foreground ${
                            sizeError ? "border-destructive" : "border-border"
                          }`
                    }`}
                  >
                    {String(size)}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to bag */}
            <Button
              type="button"
              onClick={handleAddToCart}
              data-ocid="add-to-cart-btn"
              className="w-full rounded-none bg-foreground text-background hover:bg-foreground/80 transition-smooth text-xs tracking-widest uppercase py-6 font-medium h-auto"
            >
              Add to Bag
            </Button>

            {/* Shipping note */}
            <p className="text-[11px] text-muted-foreground mt-3 text-center tracking-wide leading-relaxed">
              Free delivery on orders above ₹2,000 · Returns within 14 days
            </p>

            {/* Product details grid */}
            <div className="border-t border-border mt-8 pt-6 grid grid-cols-2 gap-x-6 gap-y-4 text-xs">
              {[
                ["Material", "Premium cotton / nylon blend"],
                ["Fit", "Oversized / relaxed"],
                ["Care", "Cold wash. Do not tumble dry."],
                ["Origin", "Designed in India"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-muted-foreground tracking-widest uppercase mb-1">
                    {label}
                  </p>
                  <p className="text-foreground leading-relaxed">{value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="bg-muted/20 border-t border-border px-5 md:px-12 py-14 md:py-20">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">
              You May Also Like
            </p>
            <h2 className="font-display text-2xl md:text-3xl text-foreground mb-10 tracking-tight">
              More from {product.category}
            </h2>
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-5"
              data-ocid="related-products"
            >
              {related.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
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

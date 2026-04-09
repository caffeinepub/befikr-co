import { ImageCarousel } from "@/components/ImageCarousel";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { ShoppingCart, Zap } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const GLOW_COLORS = [
  {
    border: "rgba(204,255,0,0.7)",
    glow: "rgba(204,255,0,0.28)",
    badge: "#CCFF00",
    badgeText: "#000",
  },
  {
    border: "rgba(0,217,255,0.7)",
    glow: "rgba(0,217,255,0.28)",
    badge: "#00D9FF",
    badgeText: "#000",
  },
  {
    border: "rgba(255,0,107,0.7)",
    glow: "rgba(255,0,107,0.28)",
    badge: "#FF006B",
    badgeText: "#fff",
  },
  {
    border: "rgba(255,140,0,0.7)",
    glow: "rgba(255,140,0,0.28)",
    badge: "#FF8C00",
    badgeText: "#000",
  },
];

function getColorScheme(id: string) {
  const sum = id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return GLOW_COLORS[sum % GLOW_COLORS.length];
}

export function ProductCard({ product, className }: ProductCardProps) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const scheme = getColorScheme(product.id);

  const handleClick = () => {
    navigate({ to: "/product/$id", params: { id: product.id } });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-ocid={`product-card-${product.id}`}
      className={cn("group block text-left w-full cursor-pointer", className)}
      style={{ background: "transparent" }}
    >
      {/* Image container */}
      <div
        className="relative overflow-hidden aspect-[3/4] transition-all duration-300"
        style={{
          background: "#0a0a0a",
          boxShadow: hovered
            ? `0 0 0 2px ${scheme.border}, 0 0 28px ${scheme.glow}`
            : "0 0 0 1px rgba(255,255,255,0.06)",
          borderRadius: "2px",
        }}
      >
        {/* Carousel fills the image area */}
        <ImageCarousel
          images={product.images}
          alt={product.name}
          className="absolute inset-0"
        />

        {/* Badge */}
        {product.tag && (
          <span
            className="absolute top-3 left-3 text-[9px] tracking-[0.2em] uppercase font-black px-2.5 py-1 z-10"
            style={{
              background: scheme.badge,
              color: scheme.badgeText,
              borderRadius: "2px",
              letterSpacing: "0.18em",
            }}
          >
            {product.tag}
          </span>
        )}

        {/* Hover overlay with quick actions */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-end pb-5 gap-2 transition-all duration-300 z-10"
          style={{
            background: hovered
              ? "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)"
              : "transparent",
            opacity: hovered ? 1 : 0,
            pointerEvents: hovered ? "auto" : "none",
          }}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigate({ to: "/product/$id", params: { id: product.id } });
            }}
            className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase font-black px-5 py-2.5 transition-all duration-200"
            style={{
              background: scheme.badge,
              color: scheme.badgeText,
              borderRadius: "2px",
              boxShadow: `0 0 12px ${scheme.glow}`,
            }}
          >
            <ShoppingCart size={12} />
            View Item
          </button>
        </div>

        {/* Corner accent */}
        {hovered && (
          <div
            className="absolute top-0 right-0 w-6 h-6 z-10"
            style={{
              background: `linear-gradient(135deg, transparent 50%, ${scheme.badge} 50%)`,
              opacity: 0.8,
            }}
          />
        )}
      </div>

      {/* Product info */}
      <div className="pt-4 px-0.5">
        <div className="flex items-center justify-between mb-1">
          <p
            className="text-[9px] tracking-[0.22em] uppercase font-black"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            {product.category}
          </p>
          {product.tag === "New" && (
            <Zap
              size={11}
              style={{
                color: scheme.badge,
                filter: `drop-shadow(0 0 4px ${scheme.glow})`,
              }}
            />
          )}
        </div>

        <h3
          className="text-sm font-bold text-foreground leading-snug truncate transition-smooth"
          style={{ color: hovered ? "#ffffff" : "rgba(255,255,255,0.82)" }}
        >
          {product.name}
        </h3>

        <p
          className="text-base font-black mt-1.5 font-display tracking-wide"
          style={{
            color: scheme.badge,
            textShadow: hovered ? `0 0 10px ${scheme.glow}` : "none",
            transition: "text-shadow 0.3s ease",
          }}
        >
          ₹{product.price}
        </p>
      </div>
    </button>
  );
}

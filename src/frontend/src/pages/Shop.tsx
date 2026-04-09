import { ProductCard } from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import {
  type Product,
  type ProductCategory,
  type ProductSize,
  categories,
  getByCategory,
  products,
} from "@/data/products";
import { cn } from "@/lib/utils";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { X, Zap } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────

type PriceRange = "under-50" | "50-100" | "over-100";

const PRICE_LABELS: Record<PriceRange, string> = {
  "under-50": "Under ₹75",
  "50-100": "₹75 – ₹150",
  "over-100": "Over ₹150",
};

const PRICE_RANGES: Record<PriceRange, { min: number; max: number }> = {
  "under-50": { min: 0, max: 75 },
  "50-100": { min: 75, max: 150 },
  "over-100": { min: 150, max: Number.POSITIVE_INFINITY },
};

const ALL_SIZES: ProductSize[] = ["XS", "S", "M", "L", "XL", "XXL"];

// ─── Skeleton Grid ──────────────────────────────────────────────────────────

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
      {["a", "b", "c", "d", "e", "f", "g", "h"].map((id) => (
        <div key={id} className="space-y-4">
          <div className="aspect-[3/4] w-full relative overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #0d0d0d 100%)",
                backgroundSize: "200% 200%",
                animation: "skeleton-neon 1.8s ease-in-out infinite",
              }}
            />
          </div>
          <Skeleton className="h-3 w-1/3" style={{ background: "#111" }} />
          <Skeleton className="h-4 w-2/3" style={{ background: "#111" }} />
          <Skeleton className="h-4 w-1/4" style={{ background: "#111" }} />
        </div>
      ))}
    </div>
  );
}

// ─── Active Filter Pill ─────────────────────────────────────────────────────

function FilterPill({
  label,
  color,
  onRemove,
}: {
  label: string;
  color: "lime" | "pink" | "cyan";
  onRemove: () => void;
}) {
  const styles = {
    lime: "bg-[#ccff00] text-black border-[#ccff00] hover:shadow-[0_0_16px_rgba(204,255,0,0.7)]",
    pink: "bg-[#ff006b] text-white border-[#ff006b] hover:shadow-[0_0_16px_rgba(255,0,107,0.7)]",
    cyan: "bg-[#00d9ff] text-black border-[#00d9ff] hover:shadow-[0_0_16px_rgba(0,217,255,0.7)]",
  };
  return (
    <button
      type="button"
      onClick={onRemove}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-1.5 text-[10px] tracking-widest uppercase font-bold border transition-all duration-200",
        styles[color],
      )}
      data-ocid="filter-pill"
    >
      {label}
      <X size={10} strokeWidth={3} />
    </button>
  );
}

// ─── Inactive Filter Button ─────────────────────────────────────────────────

function FilterBtn({
  label,
  active,
  accentColor,
  onClick,
  ocid,
}: {
  label: string;
  active: boolean;
  accentColor: string;
  onClick: () => void;
  ocid?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-ocid={ocid}
      className={cn(
        "px-5 py-3 text-[11px] tracking-widest uppercase font-bold transition-all duration-200",
        active
          ? "text-black"
          : "text-foreground border-r border-[#1a1a1a] hover:text-black",
      )}
      style={
        active
          ? {
              background: accentColor,
              boxShadow: `0 0 14px ${accentColor}99, 0 0 30px ${accentColor}44`,
            }
          : undefined
      }
      onMouseEnter={(e) => {
        if (!active) {
          (e.currentTarget as HTMLButtonElement).style.background = accentColor;
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            `0 0 14px ${accentColor}99`;
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          (e.currentTarget as HTMLButtonElement).style.background = "";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "";
        }
      }}
    >
      {label}
    </button>
  );
}

// ─── Empty State ────────────────────────────────────────────────────────────

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-40 text-center fade-in"
      data-ocid="shop-empty-state"
    >
      <div className="neon-divider-lime w-24 mb-12 mx-auto" />
      <p className="font-display text-5xl md:text-7xl font-black text-gradient-lime-pink mb-6 tracking-tight leading-none">
        NO DRIP FOUND.
      </p>
      <p className="text-sm text-muted-foreground mb-12 max-w-[300px] leading-relaxed">
        Your filters are too strict. Even we can't handle that level of
        exclusivity. Try something else.
      </p>
      <button
        type="button"
        onClick={onClear}
        data-ocid="empty-state-clear"
        className="text-[12px] tracking-widest uppercase font-black px-10 py-4 text-black transition-all duration-200 hover:scale-105"
        style={{
          background: "#ccff00",
          boxShadow:
            "0 0 20px rgba(204,255,0,0.6), 0 0 44px rgba(204,255,0,0.3)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            "0 0 30px rgba(204,255,0,0.9), 0 0 60px rgba(204,255,0,0.5)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            "0 0 20px rgba(204,255,0,0.6), 0 0 44px rgba(204,255,0,0.3)";
        }}
      >
        Clear All Filters
      </button>
      <div className="neon-divider-lime w-24 mt-12 mx-auto" />
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────

export default function ShopPage() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as {
    category?: string;
    sizes?: string;
    price?: string;
  };

  const activeCategory = (search.category as ProductCategory) ?? null;
  const activeSizes: ProductSize[] = search.sizes
    ? (search.sizes.split(",") as ProductSize[])
    : [];
  const activePrice: PriceRange | null = (search.price as PriceRange) ?? null;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  // ── URL update helpers ─────────────────────────────────────────────────

  const setCategory = (cat: ProductCategory | null) => {
    navigate({
      to: "/shop",
      search: { ...search, category: cat ?? undefined },
    });
  };

  const toggleSize = (size: ProductSize) => {
    const next = activeSizes.includes(size)
      ? activeSizes.filter((s) => s !== size)
      : [...activeSizes, size];
    navigate({
      to: "/shop",
      search: {
        ...search,
        sizes: next.length > 0 ? next.join(",") : undefined,
      },
    });
  };

  const setPrice = (range: PriceRange | null) => {
    navigate({
      to: "/shop",
      search: { ...search, price: range ?? undefined },
    });
  };

  const clearAll = () => {
    navigate({ to: "/shop", search: {} });
  };

  // ── Filtering logic ────────────────────────────────────────────────────

  const filtered = useMemo<Product[]>(() => {
    let list = activeCategory ? getByCategory(activeCategory) : products;

    if (activeSizes.length > 0) {
      list = list.filter((p) => activeSizes.some((s) => p.sizes.includes(s)));
    }

    if (activePrice) {
      const { min, max } = PRICE_RANGES[activePrice];
      list = list.filter((p) => p.price >= min && p.price <= max);
    }

    return list;
  }, [activeCategory, activeSizes, activePrice]);

  const hasFilters =
    activeCategory !== null || activeSizes.length > 0 || activePrice !== null;

  return (
    <div className="min-h-screen bg-background">
      {/* ── Page Header ─────────────────────────────────────────── */}
      <section className="relative bg-background border-b border-[#1a1a1a] px-8 lg:px-16 pt-36 pb-16 overflow-hidden">
        {/* Background accent blobs */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #ccff00 0%, transparent 70%)",
            transform: "translate(30%, -30%)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full opacity-8 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #00d9ff 0%, transparent 70%)",
            transform: "translateY(50%)",
          }}
        />

        <div className="max-w-screen-xl mx-auto relative">
          <div className="flex items-center gap-3 mb-5">
            <Zap
              size={14}
              className="text-[#ccff00]"
              style={{ filter: "drop-shadow(0 0 6px #ccff00)" }}
            />
            <p
              className="text-[11px] tracking-[0.25em] uppercase font-bold"
              style={{ color: "#00d9ff" }}
            >
              Befikr Co. — The Collection
            </p>
          </div>

          <h1
            className="font-display font-black text-gradient-lime-cyan leading-none tracking-tight mb-4"
            style={{ fontSize: "clamp(4rem, 12vw, 9rem)", lineHeight: 0.9 }}
          >
            THE DROP.
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl font-medium mt-6 max-w-lg">
            Shop the culture.{" "}
            <span
              className="font-bold"
              style={{
                color: "#ff006b",
                textShadow: "0 0 12px rgba(255,0,107,0.5)",
              }}
            >
              Rep the mindset.
            </span>
          </p>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-8 lg:px-16">
        {/* ── Filter System ─────────────────────────────────────── */}
        <div className="py-10">
          <div
            className="border border-[#1a1a1a] overflow-hidden"
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            {/* Category Row */}
            <div className="flex flex-wrap items-stretch border-b border-[#1a1a1a]">
              <span
                className="flex items-center gap-2 px-6 py-4 text-[11px] tracking-[0.2em] uppercase font-black border-r border-[#1a1a1a] shrink-0 min-w-[120px]"
                style={{ color: "#00d9ff" }}
              >
                FILTERS:
              </span>
              <div className="flex flex-wrap">
                {categories.map((cat) => (
                  <FilterBtn
                    key={cat}
                    label={cat}
                    active={activeCategory === cat}
                    accentColor="#ccff00"
                    onClick={() =>
                      setCategory(activeCategory === cat ? null : cat)
                    }
                    ocid={`filter-category-${cat.toLowerCase().replace(/\s/g, "-")}`}
                  />
                ))}
              </div>
            </div>

            {/* Size Row */}
            <div className="flex flex-wrap items-stretch border-b border-[#1a1a1a]">
              <span
                className="flex items-center px-6 py-4 text-[11px] tracking-[0.2em] uppercase font-black border-r border-[#1a1a1a] shrink-0 min-w-[120px]"
                style={{ color: "#00d9ff" }}
              >
                SIZE:
              </span>
              <div className="flex flex-wrap">
                {ALL_SIZES.map((size) => (
                  <FilterBtn
                    key={size}
                    label={size}
                    active={activeSizes.includes(size)}
                    accentColor="#ff006b"
                    onClick={() => toggleSize(size)}
                    ocid={`filter-size-${size.toLowerCase()}`}
                  />
                ))}
              </div>
            </div>

            {/* Price Row */}
            <div className="flex flex-wrap items-stretch">
              <span
                className="flex items-center px-6 py-4 text-[11px] tracking-[0.2em] uppercase font-black border-r border-[#1a1a1a] shrink-0 min-w-[120px]"
                style={{ color: "#00d9ff" }}
              >
                PRICE:
              </span>
              <div className="flex flex-wrap">
                {(Object.keys(PRICE_LABELS) as PriceRange[]).map((range) => (
                  <FilterBtn
                    key={range}
                    label={PRICE_LABELS[range]}
                    active={activePrice === range}
                    accentColor="#ccff00"
                    onClick={() =>
                      setPrice(activePrice === range ? null : range)
                    }
                    ocid={`filter-price-${range}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Active Pills + Count Row ───────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 min-h-[36px]">
          <div className="flex flex-wrap items-center gap-3">
            {hasFilters && (
              <>
                {activeCategory && (
                  <FilterPill
                    label={activeCategory}
                    color="lime"
                    onRemove={() => setCategory(null)}
                  />
                )}
                {activeSizes.map((s) => (
                  <FilterPill
                    key={s}
                    label={s}
                    color="pink"
                    onRemove={() => toggleSize(s)}
                  />
                ))}
                {activePrice && (
                  <FilterPill
                    label={PRICE_LABELS[activePrice]}
                    color="cyan"
                    onRemove={() => setPrice(null)}
                  />
                )}
                <button
                  type="button"
                  onClick={clearAll}
                  data-ocid="filter-clear-all"
                  className="text-[10px] tracking-widest uppercase font-bold text-muted-foreground hover:text-foreground transition-smooth underline underline-offset-4 ml-1"
                >
                  Clear all
                </button>
              </>
            )}
          </div>
          <p
            className="text-[11px] tracking-widest uppercase font-bold"
            style={{ color: "#00d9ff" }}
          >
            {isLoading
              ? "—"
              : `${filtered.length} PIECE${filtered.length !== 1 ? "S" : ""}`}
          </p>
        </div>

        {/* ── Neon Divider ──────────────────────────────────────── */}
        <div className="neon-divider-lime mb-10" />

        {/* ── Product Grid ──────────────────────────────────────── */}
        <div className="py-4 pb-24">
          {isLoading ? (
            <ProductGridSkeleton />
          ) : filtered.length === 0 ? (
            <EmptyState onClear={clearAll} />
          ) : (
            <div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 fade-in"
              data-ocid="product-grid"
            >
              {filtered.map((product, i) => (
                <div
                  key={product.id}
                  className="slide-up"
                  style={{
                    animationDelay: `${i * 80}ms`,
                    animationFillMode: "both",
                    opacity: 0,
                  }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Footer Strip ──────────────────────────────────────── */}
        {!isLoading && filtered.length > 0 && (
          <div className="border-t border-[#1a1a1a] py-14 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <p
                className="text-[11px] tracking-[0.2em] uppercase font-black mb-1"
                style={{ color: "#ccff00" }}
              >
                NEW DROPS EVERY SEASON
              </p>
              <p className="text-muted-foreground text-xs">
                Stay locked in. The culture waits for no one.
              </p>
            </div>
            <button
              type="button"
              onClick={clearAll}
              data-ocid="shop-reset"
              className="text-[12px] tracking-widest uppercase font-black px-10 py-4 text-black transition-all duration-200 hover:scale-105"
              style={{
                background: "#ccff00",
                boxShadow:
                  "0 0 16px rgba(204,255,0,0.5), 0 0 36px rgba(204,255,0,0.25)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 28px rgba(204,255,0,0.9), 0 0 56px rgba(204,255,0,0.5)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 16px rgba(204,255,0,0.5), 0 0 36px rgba(204,255,0,0.25)";
              }}
            >
              View All Pieces
            </button>
          </div>
        )}
      </div>

      {/* Skeleton neon shimmer keyframe */}
      <style>{`
        @keyframes skeleton-neon {
          0%, 100% { background-position: 0% 50%; opacity: 0.6; }
          50% { background-position: 100% 50%; opacity: 1; }
        }
      `}</style>
    </div>
  );
}

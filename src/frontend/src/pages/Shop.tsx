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
import { X } from "lucide-react";
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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
      {["a", "b", "c", "d", "e", "f", "g", "h"].map((id) => (
        <div key={id} className="space-y-3">
          <Skeleton className="aspect-[3/4] w-full rounded-none" />
          <Skeleton className="h-3 w-1/3 rounded-none" />
          <Skeleton className="h-4 w-2/3 rounded-none" />
          <Skeleton className="h-4 w-1/4 rounded-none" />
        </div>
      ))}
    </div>
  );
}

// ─── Filter Pill ────────────────────────────────────────────────────────────

function FilterPill({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] tracking-widest uppercase border border-foreground text-foreground hover:bg-foreground hover:text-background transition-smooth"
      data-ocid="filter-pill"
    >
      {label}
      <X size={9} strokeWidth={2.5} />
    </button>
  );
}

// ─── Empty State ────────────────────────────────────────────────────────────

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-36 text-center fade-in"
      data-ocid="shop-empty-state"
    >
      <div className="w-12 h-px bg-border mb-10 mx-auto" />
      <p className="font-display text-4xl md:text-5xl text-foreground mb-4 tracking-tight leading-none">
        Nothing here.
      </p>
      <p className="text-sm text-muted-foreground mb-10 max-w-[280px] leading-relaxed">
        No products match your current filters. Try adjusting or clearing your
        selection.
      </p>
      <button
        type="button"
        onClick={onClear}
        data-ocid="empty-state-clear"
        className="text-[11px] tracking-widest uppercase border border-border px-8 py-3.5 text-foreground hover:bg-foreground hover:text-background transition-smooth"
      >
        Clear Filters
      </button>
      <div className="w-12 h-px bg-border mt-10 mx-auto" />
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
      {/* Page Header */}
      <section className="border-b border-border bg-card px-6 md:px-12 xl:px-20 py-14">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-3">
            Befikr Co. — Collection
          </p>
          <h1 className="font-display text-6xl md:text-8xl font-semibold text-foreground leading-none tracking-tight">
            Shop
          </h1>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 xl:px-20 py-10">
        {/* Filter Bar */}
        <div className="border border-border mb-6">
          {/* Category Row */}
          <div className="flex flex-wrap items-stretch border-b border-border">
            <span className="flex items-center px-5 py-3 text-[10px] tracking-widest uppercase text-muted-foreground border-r border-border shrink-0 min-w-[80px]">
              Category
            </span>
            <div className="flex flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() =>
                    setCategory(activeCategory === cat ? null : cat)
                  }
                  data-ocid={`filter-category-${cat.toLowerCase().replace(/\s/g, "-")}`}
                  className={cn(
                    "px-5 py-3 text-[11px] tracking-widest uppercase border-r border-border transition-smooth",
                    activeCategory === cat
                      ? "bg-foreground text-background"
                      : "text-foreground hover:bg-muted",
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Size Row */}
          <div className="flex flex-wrap items-stretch border-b border-border">
            <span className="flex items-center px-5 py-3 text-[10px] tracking-widest uppercase text-muted-foreground border-r border-border shrink-0 min-w-[80px]">
              Size
            </span>
            <div className="flex flex-wrap">
              {ALL_SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  data-ocid={`filter-size-${size.toLowerCase()}`}
                  className={cn(
                    "px-4 py-3 text-[11px] tracking-widest uppercase border-r border-border transition-smooth min-w-[48px]",
                    activeSizes.includes(size)
                      ? "bg-foreground text-background"
                      : "text-foreground hover:bg-muted",
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Price Row */}
          <div className="flex flex-wrap items-stretch">
            <span className="flex items-center px-5 py-3 text-[10px] tracking-widest uppercase text-muted-foreground border-r border-border shrink-0 min-w-[80px]">
              Price
            </span>
            <div className="flex flex-wrap">
              {(Object.keys(PRICE_LABELS) as PriceRange[]).map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setPrice(activePrice === range ? null : range)}
                  data-ocid={`filter-price-${range}`}
                  className={cn(
                    "px-5 py-3 text-[11px] tracking-widest uppercase border-r border-border transition-smooth",
                    activePrice === range
                      ? "bg-foreground text-background"
                      : "text-foreground hover:bg-muted",
                  )}
                >
                  {PRICE_LABELS[range]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Badges + Count Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 min-h-[28px]">
          <div className="flex flex-wrap items-center gap-2">
            {hasFilters && (
              <>
                {activeCategory && (
                  <FilterPill
                    label={activeCategory}
                    onRemove={() => setCategory(null)}
                  />
                )}
                {activeSizes.map((s) => (
                  <FilterPill
                    key={s}
                    label={s}
                    onRemove={() => toggleSize(s)}
                  />
                ))}
                {activePrice && (
                  <FilterPill
                    label={PRICE_LABELS[activePrice]}
                    onRemove={() => setPrice(null)}
                  />
                )}
                <button
                  type="button"
                  onClick={clearAll}
                  data-ocid="filter-clear-all"
                  className="text-[10px] tracking-widest uppercase text-muted-foreground hover:text-foreground transition-smooth underline underline-offset-4 ml-1"
                >
                  Clear all
                </button>
              </>
            )}
          </div>
          <p className="text-[10px] tracking-widest uppercase text-muted-foreground">
            {isLoading
              ? "—"
              : `${filtered.length} item${filtered.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <ProductGridSkeleton />
        ) : filtered.length === 0 ? (
          <EmptyState onClear={clearAll} />
        ) : (
          <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12 fade-in"
            data-ocid="product-grid"
          >
            {filtered.map((product, i) => (
              <div
                key={product.id}
                className="slide-up"
                style={{
                  animationDelay: `${i * 35}ms`,
                  animationFillMode: "both",
                }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {/* Footer Strip */}
        {!isLoading && filtered.length > 0 && (
          <div className="border-t border-border mt-20 pt-12 pb-4 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-[10px] tracking-widest uppercase text-muted-foreground">
              New drops every season
            </p>
            <button
              type="button"
              onClick={clearAll}
              data-ocid="shop-reset"
              className="text-[11px] tracking-widest uppercase border border-border px-7 py-3 text-foreground hover:bg-foreground hover:text-background transition-smooth"
            >
              View All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

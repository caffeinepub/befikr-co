import { Badge } from "@/components/ui/badge";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate({ to: "/product/$id", params: { id: product.id } });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      data-ocid={`product-card-${product.id}`}
      className={cn("group block text-left w-full", className)}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-muted aspect-[3/4]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {product.tag && (
          <Badge
            variant="secondary"
            className="absolute top-3 left-3 text-[10px] tracking-widest uppercase rounded-none px-2 py-0.5"
          >
            {product.tag}
          </Badge>
        )}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-all duration-500" />
      </div>

      {/* Info */}
      <div className="pt-3">
        <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">
          {product.category}
        </p>
        <h3 className="text-sm font-medium text-foreground leading-snug truncate group-hover:opacity-70 transition-smooth">
          {product.name}
        </h3>
        <p className="text-sm text-foreground mt-1 font-display font-semibold">
          ₹{product.price}
        </p>
      </div>
    </button>
  );
}

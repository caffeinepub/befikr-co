import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useState } from "react";

interface ImageCarouselProps {
  images: string[];
  alt?: string;
  className?: string;
}

export function ImageCarousel({
  images,
  alt = "",
  className,
}: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const total = images.length;

  const prev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrent((c) => (c - 1 + total) % total);
    },
    [total],
  );

  const next = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrent((c) => (c + 1) % total);
    },
    [total],
  );

  const goTo = useCallback((e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    setCurrent(idx);
  }, []);

  if (total === 0) return null;

  return (
    <div
      className={cn("relative w-full h-full overflow-hidden", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides strip */}
      <div
        className="flex h-full"
        style={{
          width: `${total * 100}%`,
          transform: `translateX(-${(current / total) * 100}%)`,
          transition: "transform 250ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {images.map((src, i) => (
          <div
            key={src}
            className="relative h-full flex-shrink-0"
            style={{ width: `${100 / total}%` }}
          >
            <img
              src={src}
              alt={`${alt} — view ${i + 1}`}
              className="w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      {/* Left arrow */}
      {total > 1 && (
        <button
          type="button"
          aria-label="Previous image"
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-7 h-7 transition-all duration-200"
          style={{
            background: "rgba(0,0,0,0.62)",
            border: "1px solid rgba(204,255,0,0.25)",
            borderRadius: "2px",
            opacity: isHovered ? 1 : 0,
            transform: `translateY(-50%) translateX(${isHovered ? "0" : "-4px"})`,
            boxShadow: isHovered ? "0 0 8px rgba(204,255,0,0.35)" : "none",
          }}
        >
          <ChevronLeft size={14} color="#CCFF00" strokeWidth={2.5} />
        </button>
      )}

      {/* Right arrow */}
      {total > 1 && (
        <button
          type="button"
          aria-label="Next image"
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-7 h-7 transition-all duration-200"
          style={{
            background: "rgba(0,0,0,0.62)",
            border: "1px solid rgba(204,255,0,0.25)",
            borderRadius: "2px",
            opacity: isHovered ? 1 : 0,
            transform: `translateY(-50%) translateX(${isHovered ? "0" : "4px"})`,
            boxShadow: isHovered ? "0 0 8px rgba(204,255,0,0.35)" : "none",
          }}
        >
          <ChevronRight size={14} color="#CCFF00" strokeWidth={2.5} />
        </button>
      )}

      {/* Dot indicators */}
      {total > 1 && (
        <div
          className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 transition-opacity duration-200"
          style={{ opacity: isHovered ? 1 : 0.55 }}
        >
          {images.map((src, i) => (
            <button
              key={`dot-${src}`}
              type="button"
              aria-label={`Go to image ${i + 1}`}
              onClick={(e) => goTo(e, i)}
              className="transition-all duration-200"
              style={{
                width: i === current ? "16px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background:
                  i === current ? "#CCFF00" : "rgba(255,255,255,0.35)",
                boxShadow:
                  i === current ? "0 0 6px rgba(204,255,0,0.8)" : "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

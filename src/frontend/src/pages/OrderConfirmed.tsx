import { useCartStore } from "@/store/cartStore";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, Package, Truck } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
function genOrderId() {
  return Array.from(
    { length: 6 },
    () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)],
  ).join("");
}
function addDays(n: number) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  shape: "circle" | "square" | "diamond";
}

const NEON_COLORS = ["#ccff00", "#ff006b", "#00d9ff", "#ff8c00", "#ccff00"];

function Confetti() {
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 40 + 60,
        size: Math.random() * 8 + 4,
        color: NEON_COLORS[i % NEON_COLORS.length],
        delay: Math.random() * 1.2,
        duration: Math.random() * 1.5 + 1.8,
        shape: (["circle", "square", "diamond"] as const)[i % 3],
      })),
    [],
  );

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            opacity: 0,
            borderRadius:
              p.shape === "circle"
                ? "50%"
                : p.shape === "diamond"
                  ? "2px"
                  : "0",
            transform: p.shape === "diamond" ? "rotate(45deg)" : "none",
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          }}
          animate={{
            y: [0, -(p.y + 80)],
            opacity: [0, 0.9, 0.7, 0],
            rotate: [0, 180 + Math.random() * 180],
            scale: [0.5, 1, 0.8],
          }}
          transition={{
            delay: p.delay,
            duration: p.duration,
            ease: [0.23, 1, 0.32, 1],
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 2 + Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

export default function OrderConfirmedPage() {
  const { items, clearCart } = useCartStore();
  const cleared = useRef(false);
  const [orderId] = useState(() => genOrderId());
  const [deliveryDate] = useState(() => addDays(5));
  const [savedItems] = useState(() => [...items]);

  useEffect(() => {
    if (!cleared.current) {
      cleared.current = true;
      clearCart();
    }
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center px-6 py-20">
      {/* Ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(204,255,0,0.07) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 20% 80%, rgba(0,217,255,0.05) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 80% 20%, rgba(255,0,107,0.05) 0%, transparent 60%)",
        }}
      />

      {/* Confetti particles */}
      <Confetti />

      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center text-center">
        {/* Check icon with glow ring */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          className="mb-8 relative"
        >
          <div
            className="w-24 h-24 flex items-center justify-center relative"
            style={{
              border: "2px solid rgba(204,255,0,0.5)",
              borderRadius: "50%",
              boxShadow:
                "0 0 40px rgba(204,255,0,0.4), 0 0 80px rgba(204,255,0,0.15), inset 0 0 30px rgba(204,255,0,0.06)",
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{
                duration: 2.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <CheckCircle2
                size={44}
                style={{
                  color: "var(--neon-lime)",
                  filter: "drop-shadow(0 0 12px rgba(204,255,0,0.8))",
                }}
              />
            </motion.div>
            {/* Rotating ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{
                border: "1px solid transparent",
                borderTopColor: "rgba(204,255,0,0.6)",
                borderRightColor: "rgba(0,217,255,0.3)",
              }}
            />
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          <p
            className="font-display text-xs tracking-[0.35em] uppercase font-semibold mb-3"
            style={{ color: "var(--neon-cyan)" }}
          >
            🎉 Order Placed Successfully
          </p>
          <h1
            className="font-display font-black tracking-tighter text-gradient-lime-pink mb-4"
            style={{ fontSize: "clamp(2.8rem, 8vw, 5rem)", lineHeight: 1 }}
          >
            ORDER CONFIRMED!
          </h1>
          <p
            className="font-display text-lg font-medium"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            You just secured the bag. 💸 Your drip is on its way!
          </p>
        </motion.div>

        {/* Order meta card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="w-full mt-10 p-7"
          style={{
            background: "rgba(8,8,8,0.95)",
            border: "1px solid rgba(204,255,0,0.15)",
            borderTop: "2px solid var(--neon-lime)",
            boxShadow:
              "0 0 50px rgba(204,255,0,0.07), inset 0 1px 0 rgba(204,255,0,0.2)",
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-7">
            <div
              className="text-left p-5"
              style={{
                background: "rgba(204,255,0,0.04)",
                border: "1px solid rgba(204,255,0,0.1)",
              }}
            >
              <p
                className="font-display text-xs tracking-widest uppercase font-semibold mb-2"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Order ID
              </p>
              <p
                className="font-display font-black text-2xl tracking-wider text-glow-lime"
                style={{ color: "var(--neon-lime)" }}
              >
                #{orderId}
              </p>
            </div>
            <div
              className="text-left p-5"
              style={{
                background: "rgba(0,217,255,0.04)",
                border: "1px solid rgba(0,217,255,0.1)",
              }}
            >
              <p
                className="font-display text-xs tracking-widest uppercase font-semibold mb-2"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Est. Delivery
              </p>
              <div className="flex items-center gap-2">
                <Truck
                  size={14}
                  style={{ color: "var(--neon-cyan)", flexShrink: 0 }}
                />
                <p
                  className="font-display font-bold text-sm leading-snug"
                  style={{ color: "var(--neon-cyan)" }}
                >
                  {deliveryDate}
                </p>
              </div>
            </div>
          </div>

          {/* Items summary */}
          {savedItems.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Package
                  size={13}
                  style={{ color: "rgba(255,255,255,0.35)" }}
                />
                <p
                  className="font-display text-xs tracking-widest uppercase font-semibold"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  Items Ordered
                </p>
                <div
                  className="flex-1 h-px"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                />
              </div>
              <div className="space-y-3">
                {savedItems.map((item, i) => (
                  <motion.div
                    key={`${item.product.id}-${item.size}`}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <div
                      className="w-10 h-12 shrink-0 overflow-hidden"
                      style={{ border: "1px solid rgba(204,255,0,0.12)" }}
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p
                        className="font-display text-xs font-semibold uppercase tracking-wide truncate"
                        style={{ color: "rgba(255,255,255,0.75)" }}
                      >
                        {item.product.name}
                      </p>
                      <p
                        className="font-display text-xs mt-0.5"
                        style={{ color: "rgba(255,255,255,0.35)" }}
                      >
                        Size {item.size} × {item.quantity}
                      </p>
                    </div>
                    <p
                      className="font-display font-bold text-sm tabular-nums shrink-0"
                      style={{ color: "var(--neon-lime)" }}
                    >
                      ₹{(item.product.price * item.quantity).toFixed(0)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Info tags */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-wrap gap-3 justify-center mt-7"
        >
          {[
            { label: "Order Confirmed", color: "var(--neon-lime)" },
            { label: "Payment Processed", color: "var(--neon-cyan)" },
            { label: "Being Packed", color: "var(--neon-orange)" },
          ].map(({ label, color }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 px-3 py-1.5"
              style={{
                border: `1px solid ${color}30`,
                background: `${color}0a`,
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full pulse-glow"
                style={{ background: color }}
              />
              <span
                className="font-display text-xs tracking-wider uppercase font-semibold"
                style={{ color: `${color}` }}
              >
                {label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center"
        >
          <Link
            to="/"
            data-ocid="continue-shopping-btn"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 font-display font-black text-sm tracking-widest uppercase transition-glow"
            style={{
              background: "var(--neon-lime)",
              color: "#000",
              boxShadow:
                "0 0 24px rgba(204,255,0,0.5), 0 0 60px rgba(204,255,0,0.2)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 0 40px rgba(204,255,0,0.8), 0 0 80px rgba(204,255,0,0.4)";
              (e.currentTarget as HTMLAnchorElement).style.transform =
                "scale(1.04)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 0 24px rgba(204,255,0,0.5), 0 0 60px rgba(204,255,0,0.2)";
              (e.currentTarget as HTMLAnchorElement).style.transform =
                "scale(1)";
            }}
          >
            CONTINUE SHOPPING →
          </Link>
          <Link
            to="/shop"
            data-ocid="browse-more-btn"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 font-display font-bold text-sm tracking-widest uppercase transition-smooth"
            style={{
              border: "1px solid rgba(0,217,255,0.35)",
              color: "var(--neon-cyan)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor =
                "rgba(0,217,255,0.8)";
              (e.currentTarget as HTMLAnchorElement).style.background =
                "rgba(0,217,255,0.06)";
              (e.currentTarget as HTMLAnchorElement).style.textShadow =
                "0 0 12px rgba(0,217,255,0.7)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor =
                "rgba(0,217,255,0.35)";
              (e.currentTarget as HTMLAnchorElement).style.background =
                "transparent";
              (e.currentTarget as HTMLAnchorElement).style.textShadow = "none";
            }}
          >
            Browse More
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

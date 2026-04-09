import { useCartStore } from "@/store/cartStore";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const SHIPPING_THRESHOLD = 999;
const SHIPPING_COST = 99;

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } =
    useCartStore();
  const navigate = useNavigate();

  const subtotal = totalPrice();
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const orderTotal = subtotal + shipping;

  const handleCheckout = () => {
    void navigate({ to: "/checkout" });
  };

  if (items.length === 0) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-background px-6 text-center relative overflow-hidden"
        data-ocid="empty-cart-state"
      >
        {/* Background glow orbs */}
        <div
          className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(204,255,0,0.06) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(255,0,107,0.06) 0%, transparent 70%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="relative z-10 flex flex-col items-center"
        >
          {/* Icon */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="mb-10"
          >
            <div
              className="w-24 h-24 flex items-center justify-center border-2 rounded-full"
              style={{
                borderColor: "rgba(204,255,0,0.4)",
                boxShadow:
                  "0 0 30px rgba(204,255,0,0.2), inset 0 0 20px rgba(204,255,0,0.05)",
              }}
            >
              <ShoppingBag
                size={38}
                style={{
                  color: "var(--neon-lime)",
                  filter: "drop-shadow(0 0 8px rgba(204,255,0,0.7))",
                }}
              />
            </div>
          </motion.div>

          {/* Title */}
          <h1
            className="font-display text-6xl md:text-7xl font-black tracking-tighter mb-4 text-gradient-lime-pink"
            style={{ lineHeight: 1 }}
          >
            BAG IS EMPTY.
          </h1>

          {/* Tagline */}
          <p
            className="text-lg md:text-xl font-display font-medium tracking-wide mb-12"
            style={{ color: "var(--neon-cyan)" }}
          >
            Stack your drip first. 💸
          </p>

          {/* CTA */}
          <Link
            to="/shop"
            data-ocid="empty-cart-cta"
            className="group inline-flex items-center gap-3 px-10 py-5 font-display font-black text-sm tracking-widest uppercase transition-glow"
            style={{
              background: "var(--neon-lime)",
              color: "#000",
              boxShadow:
                "0 0 24px rgba(204,255,0,0.5), 0 0 60px rgba(204,255,0,0.2)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 0 36px rgba(204,255,0,0.8), 0 0 80px rgba(204,255,0,0.4)";
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
            Shop Now
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Background ambient glow */}
      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 20% 20%, rgba(204,255,0,0.04) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 70%, rgba(0,217,255,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="mb-16"
        >
          <p
            className="font-display text-xs tracking-[0.3em] uppercase font-semibold mb-3"
            style={{ color: "var(--neon-cyan)" }}
          >
            Befikr Co. — Your Selections
          </p>
          <h1
            className="font-display text-5xl md:text-7xl font-black tracking-tighter text-gradient-lime-pink"
            style={{ lineHeight: 1.0 }}
          >
            YOUR BAG.
            <span
              className="ml-4 text-3xl md:text-4xl font-bold align-middle"
              style={{
                color: "rgba(204,255,0,0.5)",
                WebkitTextFillColor: "unset",
                backgroundImage: "none",
              }}
            >
              ({totalItems()})
            </span>
          </h1>
          <p
            className="font-display text-base md:text-lg font-medium mt-3"
            style={{ color: "var(--neon-cyan)", opacity: 0.8 }}
          >
            What&apos;s the damage? 👀
          </p>
        </motion.div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 xl:gap-20">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <AnimatePresence initial={false}>
              {items.map((item, i) => (
                <motion.div
                  key={`${item.product.id}-${item.size}`}
                  data-ocid={`cart-item-${item.product.id}`}
                  className="flex gap-6 py-8"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.35 }}
                  layout
                  style={{
                    borderBottom: "1px solid rgba(204,255,0,0.08)",
                  }}
                >
                  {/* Product image */}
                  <button
                    type="button"
                    onClick={() =>
                      navigate({
                        to: "/product/$id",
                        params: { id: item.product.id },
                      })
                    }
                    className="shrink-0 group"
                    aria-label={`View ${item.product.name}`}
                  >
                    <div
                      className="w-28 h-36 md:w-32 md:h-40 overflow-hidden transition-glow"
                      style={{
                        border: "1px solid rgba(204,255,0,0.2)",
                        boxShadow: "0 0 0 0 rgba(204,255,0,0)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.boxShadow =
                          "0 0 16px rgba(204,255,0,0.35), 0 0 40px rgba(204,255,0,0.12)";
                        (e.currentTarget as HTMLDivElement).style.borderColor =
                          "rgba(204,255,0,0.6)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.boxShadow =
                          "0 0 0 0 rgba(204,255,0,0)";
                        (e.currentTarget as HTMLDivElement).style.borderColor =
                          "rgba(204,255,0,0.2)";
                      }}
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </button>

                  {/* Product details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <button
                          type="button"
                          onClick={() =>
                            navigate({
                              to: "/product/$id",
                              params: { id: item.product.id },
                            })
                          }
                          className="font-display text-base md:text-lg font-semibold text-foreground hover:opacity-70 transition-smooth text-left tracking-wide uppercase leading-snug line-clamp-2"
                        >
                          {item.product.name}
                        </button>
                        <p
                          className="font-display text-xs tracking-widest uppercase mt-2 font-medium"
                          style={{ color: "var(--neon-cyan)", opacity: 0.7 }}
                        >
                          Size: {item.size}
                        </p>
                        <p
                          className="font-display text-sm font-bold mt-1"
                          style={{ color: "var(--neon-lime)" }}
                        >
                          ₹{item.product.price} / unit
                        </p>
                      </div>
                      {/* Remove button */}
                      <button
                        type="button"
                        onClick={() => removeItem(item.product.id, item.size)}
                        className="transition-smooth shrink-0 p-1.5 -mr-1 rounded-sm"
                        style={{ color: "var(--muted-foreground)" }}
                        aria-label={`Remove ${item.product.name}`}
                        data-ocid={`remove-${item.product.id}`}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.color =
                            "var(--neon-pink)";
                          (e.currentTarget as HTMLButtonElement).style.filter =
                            "drop-shadow(0 0 6px rgba(255,0,107,0.7))";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.color =
                            "var(--muted-foreground)";
                          (e.currentTarget as HTMLButtonElement).style.filter =
                            "none";
                        }}
                      >
                        <X size={16} />
                      </button>
                    </div>

                    {/* Quantity + line total */}
                    <div className="flex items-center justify-between mt-6">
                      <div
                        className="flex items-center"
                        data-ocid={`qty-${item.product.id}`}
                        style={{
                          border: "1px solid rgba(204,255,0,0.3)",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.size,
                              item.quantity - 1,
                            )
                          }
                          className="w-10 h-10 flex items-center justify-center transition-smooth"
                          style={{ color: "var(--neon-lime)" }}
                          aria-label="Decrease quantity"
                          data-ocid={`qty-dec-${item.product.id}`}
                          onMouseEnter={(e) => {
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.background = "rgba(204,255,0,0.1)";
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.boxShadow =
                              "inset 0 0 12px rgba(204,255,0,0.15)";
                          }}
                          onMouseLeave={(e) => {
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.background = "transparent";
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.boxShadow = "none";
                          }}
                        >
                          <Minus size={13} />
                        </button>
                        <span
                          className="w-11 text-center font-display text-sm font-bold tabular-nums"
                          style={{ color: "var(--neon-lime)" }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.size,
                              item.quantity + 1,
                            )
                          }
                          className="w-10 h-10 flex items-center justify-center transition-smooth"
                          style={{ color: "var(--neon-lime)" }}
                          aria-label="Increase quantity"
                          data-ocid={`qty-inc-${item.product.id}`}
                          onMouseEnter={(e) => {
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.background = "rgba(204,255,0,0.1)";
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.boxShadow =
                              "inset 0 0 12px rgba(204,255,0,0.15)";
                          }}
                          onMouseLeave={(e) => {
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.background = "transparent";
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.boxShadow = "none";
                          }}
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <p
                        className="font-display font-black text-xl md:text-2xl tabular-nums"
                        style={{ color: "var(--neon-lime)" }}
                      >
                        ₹{(item.product.price * item.quantity).toFixed(0)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Continue Shopping */}
            <div className="pt-10">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 font-display text-xs tracking-widest uppercase font-semibold transition-smooth group"
                data-ocid="continue-shopping"
                style={{ color: "var(--neon-cyan)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.textShadow =
                    "0 0 12px rgba(0,217,255,0.7)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.textShadow =
                    "none";
                }}
              >
                <ArrowRight
                  size={13}
                  className="rotate-180 group-hover:-translate-x-1 transition-transform duration-200"
                />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* ── Order Summary ── */}
          <motion.aside
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.25,
              duration: 0.6,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            <div
              className="sticky top-28 p-8"
              data-ocid="order-summary"
              style={{
                background: "rgba(10,10,10,0.95)",
                borderTop: "2px solid var(--neon-lime)",
                border: "1px solid rgba(204,255,0,0.15)",
                borderTopWidth: "2px",
                boxShadow:
                  "0 0 40px rgba(204,255,0,0.06), inset 0 1px 0 rgba(204,255,0,0.2)",
              }}
            >
              {/* Summary header */}
              <h2
                className="font-display text-xs tracking-[0.3em] uppercase font-black mb-8 pb-5"
                style={{
                  color: "var(--neon-lime)",
                  borderBottom: "1px solid rgba(204,255,0,0.12)",
                }}
              >
                Order Summary
              </h2>

              {/* Line items */}
              <div className="space-y-5 text-sm mb-8">
                <div className="flex justify-between items-center">
                  <span
                    className="font-display font-medium text-sm"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    Subtotal ({totalItems()}{" "}
                    {totalItems() === 1 ? "item" : "items"})
                  </span>
                  <span
                    className="font-display font-semibold tabular-nums"
                    style={{ color: "rgba(255,255,255,0.9)" }}
                  >
                    ₹{subtotal.toFixed(0)}
                  </span>
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <span
                      className="font-display font-medium text-sm"
                      style={{ color: "rgba(255,255,255,0.55)" }}
                    >
                      Shipping
                    </span>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      {shipping === 0
                        ? `Free over ₹${SHIPPING_THRESHOLD} ✓`
                        : `Free over ₹${SHIPPING_THRESHOLD}`}
                    </p>
                  </div>
                  <span
                    className={`font-display font-semibold tabular-nums ${shipping === 0 ? "line-through text-xs" : ""}`}
                    style={{
                      color:
                        shipping === 0
                          ? "rgba(255,255,255,0.3)"
                          : "rgba(255,255,255,0.9)",
                    }}
                  >
                    {shipping === 0 ? `₹${SHIPPING_COST}` : `₹${SHIPPING_COST}`}
                  </span>
                </div>

                {shipping === 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="flex justify-between items-center"
                  >
                    <span
                      className="font-display font-medium text-xs"
                      style={{ color: "var(--neon-cyan)" }}
                    >
                      You saved on shipping
                    </span>
                    <span
                      className="font-display font-bold text-xs tabular-nums"
                      style={{ color: "var(--neon-cyan)" }}
                    >
                      -₹{SHIPPING_COST}
                    </span>
                  </motion.div>
                )}
              </div>

              {/* Total — money mindset flex */}
              <div
                className="pt-6 mb-8"
                style={{ borderTop: "1px solid rgba(204,255,0,0.15)" }}
              >
                <div className="flex justify-between items-baseline gap-2">
                  <span
                    className="font-display text-xs tracking-[0.3em] uppercase font-black"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    Total
                  </span>
                  <motion.span
                    key={orderTotal}
                    initial={{ scale: 1.15, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
                    className="font-display font-black tabular-nums text-glow-lime"
                    style={{
                      color: "var(--neon-lime)",
                      fontSize: "clamp(2rem, 5vw, 3rem)",
                      lineHeight: 1,
                    }}
                  >
                    ₹{orderTotal.toFixed(0)}
                  </motion.span>
                </div>
                <p
                  className="text-xs mt-2 text-right font-display"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  Taxes included. Secure checkout.
                </p>
              </div>

              {/* Checkout CTA */}
              <motion.button
                type="button"
                data-ocid="checkout-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                className="w-full py-5 font-display font-black text-sm tracking-widest uppercase transition-glow"
                style={{
                  background: "var(--neon-lime)",
                  color: "#000",
                  boxShadow:
                    "0 0 24px rgba(204,255,0,0.45), 0 0 60px rgba(204,255,0,0.15)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 0 40px rgba(204,255,0,0.7), 0 0 80px rgba(204,255,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 0 24px rgba(204,255,0,0.45), 0 0 60px rgba(204,255,0,0.15)";
                }}
              >
                CHECKOUT →
              </motion.button>

              {/* Continue shopping link */}
              <div className="text-center mt-5">
                <Link
                  to="/shop"
                  className="font-display text-xs tracking-widest uppercase font-semibold transition-smooth"
                  style={{ color: "var(--neon-cyan)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.textShadow =
                      "0 0 12px rgba(0,217,255,0.8), 0 0 24px rgba(0,217,255,0.4)";
                    (e.currentTarget as HTMLAnchorElement).style.borderBottom =
                      "1px solid rgba(0,217,255,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.textShadow =
                      "none";
                    (e.currentTarget as HTMLAnchorElement).style.borderBottom =
                      "none";
                  }}
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}

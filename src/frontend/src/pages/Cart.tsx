import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Minus, Plus, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";

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
    toast.success("Order placed! (Demo only)", {
      description: "Thank you for shopping with Befikr Co.",
      duration: 5000,
    });
  };

  if (items.length === 0) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-background px-6 text-center"
        data-ocid="empty-cart-state"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4 tracking-tight">
            Your bag is empty.
          </p>
          <p className="text-muted-foreground text-sm tracking-widest uppercase mb-10">
            Add something unbothered to it.
          </p>
          <Link
            to="/shop"
            data-ocid="empty-cart-cta"
            className="inline-flex items-center gap-2 bg-foreground text-background text-xs tracking-widest uppercase px-8 py-4 font-semibold hover:opacity-80 transition-smooth group"
          >
            Continue Shopping
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">
            Befikr Co.
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Your Bag{" "}
            <span className="text-muted-foreground font-normal text-3xl">
              ({totalItems()})
            </span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="divide-y divide-border">
              <AnimatePresence initial={false}>
                {items.map((item, i) => (
                  <motion.div
                    key={`${item.product.id}-${item.size}`}
                    data-ocid={`cart-item-${item.product.id}`}
                    className="flex gap-6 py-8"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16, height: 0, marginBottom: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.35 }}
                    layout
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
                      <div className="w-24 h-32 md:w-28 md:h-36 bg-muted overflow-hidden">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </button>

                    {/* Product details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <button
                            type="button"
                            onClick={() =>
                              navigate({
                                to: "/product/$id",
                                params: { id: item.product.id },
                              })
                            }
                            className="text-sm font-semibold text-foreground hover:opacity-60 transition-smooth text-left tracking-wide uppercase leading-snug line-clamp-2"
                          >
                            {item.product.name}
                          </button>
                          <p className="text-xs text-muted-foreground tracking-widest uppercase mt-2">
                            Size: {item.size}
                          </p>
                          <p className="text-xs text-muted-foreground tracking-widest uppercase mt-1">
                            Unit: ₹{item.product.price}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.product.id, item.size)}
                          className="text-muted-foreground hover:text-foreground transition-smooth shrink-0 p-1 -mr-1"
                          aria-label={`Remove ${item.product.name}`}
                          data-ocid={`remove-${item.product.id}`}
                        >
                          <X size={16} />
                        </button>
                      </div>

                      {/* Quantity + line total */}
                      <div className="flex items-center justify-between mt-5">
                        <div
                          className="flex items-center border border-border"
                          data-ocid={`qty-${item.product.id}`}
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
                            className="w-9 h-9 flex items-center justify-center text-foreground hover:bg-muted transition-smooth"
                            aria-label="Decrease quantity"
                            data-ocid={`qty-dec-${item.product.id}`}
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-10 text-center text-sm font-medium text-foreground tabular-nums">
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
                            className="w-9 h-9 flex items-center justify-center text-foreground hover:bg-muted transition-smooth"
                            aria-label="Increase quantity"
                            data-ocid={`qty-inc-${item.product.id}`}
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <p className="font-display font-semibold text-foreground text-base tabular-nums">
                          ₹{(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="pt-6">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-smooth group"
                data-ocid="continue-shopping"
              >
                <ArrowRight
                  size={12}
                  className="rotate-180 group-hover:-translate-x-1 transition-transform duration-200"
                />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <motion.aside
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            <div
              className="border border-border p-8 sticky top-24 bg-card"
              data-ocid="order-summary"
            >
              <h2 className="text-xs tracking-widest uppercase font-semibold text-foreground mb-8 pb-4 border-b border-border">
                Order Summary
              </h2>

              <div className="space-y-4 text-sm mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    Subtotal ({totalItems()}{" "}
                    {totalItems() === 1 ? "item" : "items"})
                  </span>
                  <span className="text-foreground font-medium tabular-nums">
                    ₹{subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    Shipping
                    {shipping === 0 && (
                      <span className="block text-xs text-muted-foreground/60 mt-0.5 normal-case">
                        Orders over ₹{SHIPPING_THRESHOLD}
                      </span>
                    )}
                    {shipping > 0 && (
                      <span className="block text-xs text-muted-foreground/60 mt-0.5 normal-case">
                        Free over ₹{SHIPPING_THRESHOLD}
                      </span>
                    )}
                  </span>
                  <span
                    className={
                      shipping === 0
                        ? "text-foreground/60 line-through text-xs"
                        : "text-foreground font-medium"
                    }
                  >
                    {shipping === 0 ? "Free" : `₹${SHIPPING_COST.toFixed(2)}`}
                  </span>
                </div>
              </div>

              <div className="border-t border-border pt-5 mb-8">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs tracking-widest uppercase text-foreground font-semibold">
                    Total
                  </span>
                  <span className="font-display text-2xl font-bold text-foreground tabular-nums">
                    ₹{orderTotal.toFixed(2)}
                  </span>
                </div>
                {shipping === 0 && (
                  <p className="text-xs text-muted-foreground mt-1 text-right">
                    You saved ₹{SHIPPING_COST.toFixed(2)} on shipping
                  </p>
                )}
              </div>

              <Button
                type="button"
                data-ocid="checkout-btn"
                className="w-full rounded-none h-12 text-xs tracking-widest uppercase font-semibold"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4 leading-relaxed">
                Taxes included. Secure checkout.
              </p>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}

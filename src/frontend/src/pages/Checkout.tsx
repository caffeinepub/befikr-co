import { useCartStore } from "@/store/cartStore";
import { Link, useNavigate } from "@tanstack/react-router";
import { CreditCard, Lock, MapPin, ShoppingBag, User } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const SHIPPING_THRESHOLD = 999;
const SHIPPING_COST = 99;
const GST_RATE = 0.18;

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Chandigarh",
  "Jammu & Kashmir",
  "Ladakh",
  "Puducherry",
];

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  pin: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  cardName: string;
}
interface Errors {
  [key: string]: string;
}

function formatCard(val: string) {
  const digits = val.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}
function formatExpiry(val: string) {
  const digits = val.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
}

function NeonInput({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  type = "text",
  maxLength,
  inputMode,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (name: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  maxLength?: number;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  const [focused, setFocused] = useState(false);
  const inputId = `field-${name}`;
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className="font-display text-xs tracking-widest uppercase font-semibold"
        style={{
          color: focused ? "var(--neon-cyan)" : "rgba(255,255,255,0.5)",
        }}
      >
        {label}
      </label>
      <input
        id={inputId}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        inputMode={inputMode}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          onBlur(name);
        }}
        data-ocid={`input-${name}`}
        className="w-full px-4 py-3.5 font-display text-sm font-medium bg-transparent outline-none transition-smooth"
        style={{
          color: "#fff",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid",
          borderColor: error
            ? "var(--neon-pink)"
            : focused
              ? "var(--neon-cyan)"
              : "rgba(255,255,255,0.12)",
          boxShadow: focused
            ? "0 0 0 2px rgba(0,217,255,0.12), inset 0 0 10px rgba(0,217,255,0.04)"
            : error
              ? "0 0 0 2px rgba(255,0,107,0.1)"
              : "none",
        }}
      />
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="font-display text-xs font-semibold"
            style={{ color: "var(--neon-pink)" }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function NeonSelect({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  options,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur: (name: string) => void;
  error?: string;
  options: string[];
}) {
  const [focused, setFocused] = useState(false);
  const selectId = `field-${name}`;
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={selectId}
        className="font-display text-xs tracking-widest uppercase font-semibold"
        style={{
          color: focused ? "var(--neon-cyan)" : "rgba(255,255,255,0.5)",
        }}
      >
        {label}
      </label>
      <select
        id={selectId}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          onBlur(name);
        }}
        data-ocid={`select-${name}`}
        className="w-full px-4 py-3.5 font-display text-sm font-medium outline-none transition-smooth appearance-none"
        style={{
          color: value ? "#fff" : "rgba(255,255,255,0.35)",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid",
          borderColor: error
            ? "var(--neon-pink)"
            : focused
              ? "var(--neon-cyan)"
              : "rgba(255,255,255,0.12)",
          boxShadow: focused
            ? "0 0 0 2px rgba(0,217,255,0.12)"
            : error
              ? "0 0 0 2px rgba(255,0,107,0.1)"
              : "none",
        }}
      >
        <option value="" disabled style={{ background: "#111" }}>
          Select State
        </option>
        {options.map((s) => (
          <option key={s} value={s} style={{ background: "#111" }}>
            {s}
          </option>
        ))}
      </select>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="font-display text-xs font-semibold"
            style={{ color: "var(--neon-pink)" }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function SectionHeader({
  icon: Icon,
  label,
  color,
}: { icon: React.ElementType; label: string; color: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div
        className="w-9 h-9 flex items-center justify-center rounded-sm"
        style={{ background: `${color}18`, border: `1px solid ${color}40` }}
      >
        <Icon size={16} style={{ color }} />
      </div>
      <h2
        className="font-display text-xs tracking-[0.28em] uppercase font-black"
        style={{ color }}
      >
        {label}
      </h2>
      <div
        className="flex-1 h-px"
        style={{
          background: `linear-gradient(90deg, ${color}40, transparent)`,
        }}
      />
    </div>
  );
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totalItems, totalPrice } = useCartStore();
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pin: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [submitting, setSubmitting] = useState(false);
  const submitRef = useRef(false);

  const subtotal = totalPrice();
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const tax = Math.round(subtotal * GST_RATE);
  const total = subtotal + shipping + tax;

  useEffect(() => {
    if (items.length === 0 && !submitRef.current) {
      void navigate({ to: "/cart" });
    }
  }, [items.length, navigate]);

  const validate = (fields: Partial<FormState>, fieldName?: string): Errors => {
    const errs: Errors = {};
    const check = (name: string) => !fieldName || name === fieldName;

    if (check("fullName") && !fields.fullName?.trim())
      errs.fullName = "Full name is required";
    if (check("email")) {
      if (!fields.email?.trim()) errs.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
        errs.email = "Enter a valid email";
    }
    if (check("phone")) {
      if (!fields.phone?.trim()) errs.phone = "Phone number is required";
      else if (!/^\d{10}$/.test(fields.phone))
        errs.phone = "Enter exactly 10 digits";
    }
    if (check("address1") && !fields.address1?.trim())
      errs.address1 = "Address is required";
    if (check("city") && !fields.city?.trim()) errs.city = "City is required";
    if (check("state") && !fields.state) errs.state = "Please select a state";
    if (check("pin")) {
      if (!fields.pin?.trim()) errs.pin = "PIN code is required";
      else if (!/^\d{6}$/.test(fields.pin)) errs.pin = "PIN must be 6 digits";
    }
    if (check("cardNumber")) {
      const raw = fields.cardNumber?.replace(/\s/g, "") ?? "";
      if (!raw) errs.cardNumber = "Card number is required";
      else if (raw.length !== 16)
        errs.cardNumber = "Card number must be 16 digits";
    }
    if (check("expiry")) {
      if (!fields.expiry?.trim()) errs.expiry = "Expiry is required";
      else if (!/^\d{2}\/\d{2}$/.test(fields.expiry ?? ""))
        errs.expiry = "Use MM/YY format";
    }
    if (check("cvv")) {
      if (!fields.cvv?.trim()) errs.cvv = "CVV is required";
      else if (!/^\d{3}$/.test(fields.cvv)) errs.cvv = "CVV must be 3 digits";
    }
    if (check("cardName") && !fields.cardName?.trim())
      errs.cardName = "Cardholder name is required";
    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    let processed = value;
    if (name === "cardNumber") processed = formatCard(value);
    if (name === "expiry") processed = formatExpiry(value);
    if (name === "cvv") processed = value.replace(/\D/g, "").slice(0, 3);
    if (name === "pin") processed = value.replace(/\D/g, "").slice(0, 6);
    if (name === "phone") processed = value.replace(/\D/g, "").slice(0, 10);

    const updated = { ...form, [name]: processed };
    setForm(updated);
    if (touched.has(name)) {
      const fieldErr = validate(updated, name);
      setErrors((prev) => ({ ...prev, [name]: fieldErr[name] ?? "" }));
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => new Set(prev).add(name));
    const fieldErr = validate(form, name);
    setErrors((prev) => ({ ...prev, [name]: fieldErr[name] ?? "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = new Set(Object.keys(form));
    setTouched(allTouched);
    const allErrors = validate(form);
    setErrors(allErrors);
    if (Object.values(allErrors).some(Boolean)) return;

    setSubmitting(true);
    submitRef.current = true;
    await new Promise((r) => setTimeout(r, 1200));
    void navigate({ to: "/order-confirmed" });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 10% 20%, rgba(0,217,255,0.04) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 90% 80%, rgba(204,255,0,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-24 relative z-10">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="mb-14"
        >
          <p
            className="font-display text-xs tracking-[0.3em] uppercase font-semibold mb-3"
            style={{ color: "var(--neon-cyan)" }}
          >
            Befikr Co. — Secure Checkout
          </p>
          <h1
            className="font-display text-5xl md:text-6xl font-black tracking-tighter text-gradient-lime-pink"
            style={{ lineHeight: 1 }}
          >
            CHECKOUT.
          </h1>
          <p
            className="font-display text-base font-medium mt-3"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Almost there — fill in your details and secure your drip. 🔥
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 xl:gap-16">
            {/* ── Left: Form ── */}
            <motion.div
              className="lg:col-span-3 space-y-10"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.1,
                duration: 0.6,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              {/* Delivery Info */}
              <div
                className="p-8"
                style={{
                  background: "rgba(8,8,8,0.9)",
                  border: "1px solid rgba(0,217,255,0.12)",
                  boxShadow:
                    "0 0 40px rgba(0,217,255,0.04), inset 0 1px 0 rgba(0,217,255,0.1)",
                }}
              >
                <SectionHeader
                  icon={MapPin}
                  label="Delivery Info"
                  color="var(--neon-cyan)"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <NeonInput
                    label="Full Name *"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.fullName}
                    placeholder="Rahul Sharma"
                  />
                  <NeonInput
                    label="Email Address *"
                    name="email"
                    value={form.email}
                    type="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.email}
                    placeholder="rahul@gmail.com"
                  />
                  <NeonInput
                    label="Phone Number *"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.phone}
                    placeholder="9876543210"
                    inputMode="numeric"
                    maxLength={10}
                  />
                  <div className="sm:col-span-2">
                    <NeonInput
                      label="Address Line 1 *"
                      name="address1"
                      value={form.address1}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.address1}
                      placeholder="House No, Street Name"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <NeonInput
                      label="Address Line 2 (Optional)"
                      name="address2"
                      value={form.address2}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Apartment, Landmark, etc."
                    />
                  </div>
                  <NeonInput
                    label="City *"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.city}
                    placeholder="Mumbai"
                  />
                  <NeonSelect
                    label="State *"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.state}
                    options={INDIAN_STATES}
                  />
                  <NeonInput
                    label="PIN Code *"
                    name="pin"
                    value={form.pin}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.pin}
                    placeholder="400001"
                    inputMode="numeric"
                    maxLength={6}
                  />
                </div>
              </div>

              {/* Payment Info */}
              <div
                className="p-8"
                style={{
                  background: "rgba(8,8,8,0.9)",
                  border: "1px solid rgba(204,255,0,0.12)",
                  boxShadow:
                    "0 0 40px rgba(204,255,0,0.04), inset 0 1px 0 rgba(204,255,0,0.1)",
                }}
              >
                <SectionHeader
                  icon={CreditCard}
                  label="Payment Info"
                  color="var(--neon-lime)"
                />

                {/* Card preview strip */}
                <div
                  className="mb-7 p-5 relative overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(204,255,0,0.07) 0%, rgba(0,217,255,0.07) 100%)",
                    border: "1px solid rgba(204,255,0,0.18)",
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="font-display text-xs tracking-widest uppercase font-bold"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      Demo Card
                    </span>
                    <div className="flex gap-2">
                      <div
                        className="w-7 h-5 rounded-sm"
                        style={{ background: "rgba(255,140,0,0.7)" }}
                      />
                      <div
                        className="w-7 h-5 rounded-sm -ml-2.5"
                        style={{ background: "rgba(255,0,107,0.6)" }}
                      />
                    </div>
                  </div>
                  <p
                    className="font-display font-bold text-xl tracking-[0.22em] tabular-nums"
                    style={{
                      color: form.cardNumber
                        ? "rgba(255,255,255,0.9)"
                        : "rgba(255,255,255,0.25)",
                    }}
                  >
                    {form.cardNumber || "•••• •••• •••• ••••"}
                  </p>
                  <div className="flex justify-between mt-3">
                    <span
                      className="font-display text-xs"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      {form.cardName || "CARDHOLDER NAME"}
                    </span>
                    <span
                      className="font-display text-xs"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      {form.expiry || "MM/YY"}
                    </span>
                  </div>
                  <div
                    className="absolute -top-4 -right-4 w-24 h-24 rounded-full pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(204,255,0,0.12) 0%, transparent 70%)",
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <NeonInput
                      label="Card Number *"
                      name="cardNumber"
                      value={form.cardNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.cardNumber}
                      placeholder="1234 5678 9012 3456"
                      inputMode="numeric"
                      maxLength={19}
                    />
                  </div>
                  <NeonInput
                    label="Expiry (MM/YY) *"
                    name="expiry"
                    value={form.expiry}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.expiry}
                    placeholder="08/28"
                    maxLength={5}
                  />
                  <NeonInput
                    label="CVV *"
                    name="cvv"
                    value={form.cvv}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.cvv}
                    placeholder="•••"
                    type="password"
                    inputMode="numeric"
                    maxLength={3}
                  />
                  <div className="sm:col-span-2">
                    <NeonInput
                      label="Cardholder Name *"
                      name="cardName"
                      value={form.cardName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.cardName}
                      placeholder="Rahul Sharma"
                    />
                  </div>
                </div>

                <div
                  className="flex items-center gap-2 mt-5 px-4 py-3"
                  style={{
                    background: "rgba(204,255,0,0.04)",
                    border: "1px solid rgba(204,255,0,0.1)",
                  }}
                >
                  <Lock
                    size={12}
                    style={{ color: "var(--neon-lime)", flexShrink: 0 }}
                  />
                  <p
                    className="font-display text-xs"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    256-bit SSL encrypted. Your payment info is fully secured.
                    This is a demo checkout.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ── Right: Order Summary ── */}
            <motion.aside
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.6,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              <div className="sticky top-28">
                <div
                  className="p-7"
                  data-ocid="checkout-summary"
                  style={{
                    background: "rgba(8,8,8,0.95)",
                    borderTop: "2px solid var(--neon-lime)",
                    border: "1px solid rgba(204,255,0,0.15)",
                    borderTopWidth: "2px",
                    boxShadow:
                      "0 0 40px rgba(204,255,0,0.06), inset 0 1px 0 rgba(204,255,0,0.2)",
                  }}
                >
                  <SectionHeader
                    icon={ShoppingBag}
                    label="Order Summary"
                    color="var(--neon-lime)"
                  />

                  {/* Items */}
                  <div className="space-y-4 mb-7">
                    {items.map((item) => (
                      <div
                        key={`${item.product.id}-${item.size}`}
                        className="flex gap-3 items-center"
                      >
                        <div
                          className="w-12 h-14 shrink-0 overflow-hidden"
                          style={{ border: "1px solid rgba(204,255,0,0.15)" }}
                        >
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className="font-display text-xs font-semibold uppercase tracking-wide truncate"
                            style={{ color: "rgba(255,255,255,0.85)" }}
                          >
                            {item.product.name}
                          </p>
                          <p
                            className="font-display text-xs mt-0.5"
                            style={{ color: "rgba(255,255,255,0.4)" }}
                          >
                            Size: {item.size} · Qty: {item.quantity}
                          </p>
                        </div>
                        <p
                          className="font-display font-bold text-sm tabular-nums shrink-0"
                          style={{ color: "var(--neon-lime)" }}
                        >
                          ₹{(item.product.price * item.quantity).toFixed(0)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Price breakdown */}
                  <div
                    className="space-y-3 pt-5 mb-5"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div className="flex justify-between text-sm">
                      <span
                        className="font-display font-medium"
                        style={{ color: "rgba(255,255,255,0.5)" }}
                      >
                        Subtotal ({totalItems()}{" "}
                        {totalItems() === 1 ? "item" : "items"})
                      </span>
                      <span
                        className="font-display font-semibold tabular-nums"
                        style={{ color: "rgba(255,255,255,0.85)" }}
                      >
                        ₹{subtotal.toFixed(0)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span
                        className="font-display font-medium"
                        style={{ color: "rgba(255,255,255,0.5)" }}
                      >
                        GST (18%)
                      </span>
                      <span
                        className="font-display font-semibold tabular-nums"
                        style={{ color: "rgba(255,255,255,0.85)" }}
                      >
                        ₹{tax.toFixed(0)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span
                        className="font-display font-medium"
                        style={{ color: "rgba(255,255,255,0.5)" }}
                      >
                        Shipping
                      </span>
                      {shipping === 0 ? (
                        <span
                          className="font-display font-bold text-xs"
                          style={{ color: "var(--neon-cyan)" }}
                        >
                          FREE ✓
                        </span>
                      ) : (
                        <span
                          className="font-display font-semibold tabular-nums"
                          style={{ color: "rgba(255,255,255,0.85)" }}
                        >
                          ₹{shipping}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Total */}
                  <div
                    className="flex justify-between items-baseline pt-5 mb-8"
                    style={{ borderTop: "1px solid rgba(204,255,0,0.18)" }}
                  >
                    <span
                      className="font-display text-xs tracking-[0.3em] uppercase font-black"
                      style={{ color: "rgba(255,255,255,0.45)" }}
                    >
                      Total
                    </span>
                    <span
                      className="font-display font-black tabular-nums text-glow-lime"
                      style={{
                        color: "var(--neon-lime)",
                        fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                        lineHeight: 1,
                      }}
                    >
                      ₹{total.toFixed(0)}
                    </span>
                  </div>

                  {/* Place Order CTA */}
                  <motion.button
                    type="submit"
                    data-ocid="place-order-btn"
                    disabled={submitting}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-5 font-display font-black text-sm tracking-widest uppercase transition-glow relative overflow-hidden"
                    style={{
                      background: submitting
                        ? "rgba(204,255,0,0.5)"
                        : "var(--neon-lime)",
                      color: "#000",
                      boxShadow: submitting
                        ? "none"
                        : "0 0 24px rgba(204,255,0,0.5), 0 0 60px rgba(204,255,0,0.18)",
                      cursor: submitting ? "not-allowed" : "pointer",
                    }}
                    onMouseEnter={(e) => {
                      if (!submitting)
                        (e.currentTarget as HTMLButtonElement).style.boxShadow =
                          "0 0 40px rgba(204,255,0,0.75), 0 0 80px rgba(204,255,0,0.35)";
                    }}
                    onMouseLeave={(e) => {
                      if (!submitting)
                        (e.currentTarget as HTMLButtonElement).style.boxShadow =
                          "0 0 24px rgba(204,255,0,0.5), 0 0 60px rgba(204,255,0,0.18)";
                    }}
                  >
                    {submitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 0.8,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                          }}
                          className="inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full"
                        />
                        Processing...
                      </span>
                    ) : (
                      "PLACE ORDER →"
                    )}
                  </motion.button>

                  <Link
                    to="/cart"
                    data-ocid="back-to-cart"
                    className="block text-center mt-4 font-display text-xs tracking-widest uppercase font-semibold transition-smooth"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "var(--neon-cyan)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "rgba(255,255,255,0.3)";
                    }}
                  >
                    ← Back to Cart
                  </Link>
                </div>
              </div>
            </motion.aside>
          </div>
        </form>
      </div>
    </div>
  );
}

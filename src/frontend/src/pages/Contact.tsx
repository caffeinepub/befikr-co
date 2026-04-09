import { motion } from "motion/react";
import { useState } from "react";
import { SiInstagram, SiTiktok, SiX } from "react-icons/si";
import { toast } from "sonner";

const socials = [
  {
    label: "Instagram",
    icon: SiInstagram,
    href: "https://instagram.com/befikrco",
    color: "var(--neon-pink)",
    glow: "0 0 16px rgba(255,0,107,0.7)",
  },
  {
    label: "X / Twitter",
    icon: SiX,
    href: "https://twitter.com/befikrco",
    color: "var(--neon-cyan)",
    glow: "0 0 16px rgba(0,217,255,0.7)",
  },
  {
    label: "TikTok",
    icon: SiTiktok,
    href: "https://tiktok.com/@befikrco",
    color: "var(--neon-lime)",
    glow: "0 0 16px rgba(204,255,0,0.7)",
  },
];

type FormState = { name: string; email: string; message: string };
type ErrorState = { name: string; email: string; message: string };

function validate(form: FormState): ErrorState {
  const errors: ErrorState = { name: "", email: "", message: "" };
  if (!form.name.trim()) errors.name = "Name is required.";
  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!form.message.trim()) errors.message = "Message is required.";
  else if (form.message.trim().length < 10)
    errors.message = "Message must be at least 10 characters.";
  return errors;
}

function NeonInput({
  id,
  ocid,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder,
  hasError,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedby,
}: {
  id: string;
  ocid: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  placeholder: string;
  hasError: boolean;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
}) {
  return (
    <input
      id={id}
      data-ocid={ocid}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      placeholder={placeholder}
      aria-invalid={ariaInvalid}
      aria-describedby={ariaDescribedby}
      className="w-full bg-transparent text-foreground placeholder:text-foreground/25 text-base py-4 px-5 outline-none font-body"
      style={{
        borderBottom: hasError
          ? "2px solid var(--neon-pink)"
          : "2px solid rgba(204,255,0,0.3)",
        transition: "border-color 0.25s ease, box-shadow 0.25s ease",
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderBottomColor = "var(--neon-lime)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(204,255,0,0.2)";
      }}
    />
  );
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<ErrorState>({
    name: "",
    email: "",
    message: "",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleBlur = (field: keyof FormState) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(form));
  };

  const handleChange = (field: keyof FormState, value: string) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    if (touched[field]) setErrors(validate(updated));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    const errs = validate(form);
    setErrors(errs);
    if (errs.name || errs.email || errs.message) return;

    setSubmitting(true);
    setTimeout(() => {
      toast.success("Message sent! We'll slide back into your inbox. 🔥", {
        duration: 5000,
        style: {
          background: "#0a0a0a",
          border: "1px solid rgba(204,255,0,0.5)",
          color: "#ccff00",
          fontFamily: "Space Grotesk, sans-serif",
          fontWeight: 700,
          boxShadow: "0 0 20px rgba(204,255,0,0.25)",
        },
      });
      setForm({ name: "", email: "", message: "" });
      setTouched({});
      setErrors({ name: "", email: "", message: "" });
      setSubmitting(false);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ── HEADER ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-background py-28 md:py-36 border-b border-border">
        {/* Geometric bg accent */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.07] blur-[130px] pointer-events-none"
          style={{ background: "var(--neon-cyan)" }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#ccff00 1px, transparent 1px), linear-gradient(90deg, #ccff00 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <motion.p
            className="text-xs tracking-[0.3em] uppercase mb-5 font-bold"
            style={{ color: "var(--neon-lime)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            ✦ Get in Touch
          </motion.p>
          <motion.h1
            className="font-display text-[clamp(3.5rem,10vw,8rem)] font-black text-foreground leading-[0.9] tracking-tight"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            style={{ fontWeight: 900 }}
          >
            LET'S <span className="text-gradient-lime-pink">TALK.</span>
          </motion.h1>
          <motion.p
            className="text-foreground/50 text-lg mt-5 font-medium"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            No cap, we actually respond. 💬
          </motion.p>
        </div>
      </section>

      {/* ── MAIN CONTENT ───────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
          {/* ── FORM ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs tracking-[0.25em] uppercase font-black mb-3"
                  style={{ color: "var(--neon-lime)" }}
                >
                  Your Name
                </label>
                <NeonInput
                  id="name"
                  ocid="contact-name"
                  value={form.name}
                  onChange={(v) => handleChange("name", v)}
                  onBlur={() => handleBlur("name")}
                  placeholder="Drop your name"
                  hasError={!!(touched.name && errors.name)}
                  aria-invalid={!!(touched.name && errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {touched.name && errors.name && (
                  <p
                    id="name-error"
                    className="mt-2 text-xs font-semibold"
                    style={{ color: "var(--neon-pink)" }}
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs tracking-[0.25em] uppercase font-black mb-3"
                  style={{ color: "var(--neon-lime)" }}
                >
                  Email Address
                </label>
                <NeonInput
                  id="email"
                  ocid="contact-email"
                  type="email"
                  value={form.email}
                  onChange={(v) => handleChange("email", v)}
                  onBlur={() => handleBlur("email")}
                  placeholder="your@email.com"
                  hasError={!!(touched.email && errors.email)}
                  aria-invalid={!!(touched.email && errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {touched.email && errors.email && (
                  <p
                    id="email-error"
                    className="mt-2 text-xs font-semibold"
                    style={{ color: "var(--neon-pink)" }}
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs tracking-[0.25em] uppercase font-black mb-3"
                  style={{ color: "var(--neon-lime)" }}
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  data-ocid="contact-message"
                  rows={7}
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  onBlur={() => handleBlur("message")}
                  placeholder="What's on your mind? We're listening…"
                  aria-invalid={!!(touched.message && errors.message)}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                  className="w-full bg-transparent text-foreground placeholder:text-foreground/25 text-base py-4 px-5 outline-none resize-none font-body"
                  style={{
                    borderBottom:
                      touched.message && errors.message
                        ? "2px solid var(--neon-pink)"
                        : "2px solid rgba(204,255,0,0.3)",
                    transition:
                      "border-color 0.25s ease, box-shadow 0.25s ease",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderBottomColor =
                      "var(--neon-lime)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(204,255,0,0.2)";
                  }}
                />
                {touched.message && errors.message && (
                  <p
                    id="message-error"
                    className="mt-2 text-xs font-semibold"
                    style={{ color: "var(--neon-pink)" }}
                  >
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                data-ocid="contact-submit"
                disabled={submitting}
                className="w-full font-display font-black text-sm tracking-[0.2em] uppercase py-5 relative overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background: "var(--neon-lime)",
                  color: "#000000",
                }}
                whileHover={
                  submitting
                    ? {}
                    : {
                        y: -4,
                        boxShadow:
                          "0 0 28px rgba(204,255,0,0.7), 0 0 60px rgba(204,255,0,0.3)",
                      }
                }
                whileTap={submitting ? {} : { scale: 0.97, y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                {submitting ? "Sending…" : "SEND IT 🔥"}
              </motion.button>
            </form>
          </motion.div>

          {/* ── INFO ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-12"
          >
            {/* Direct */}
            <div>
              <p
                className="text-xs tracking-[0.3em] uppercase font-black mb-4"
                style={{ color: "var(--neon-cyan)" }}
              >
                ✦ Direct Line
              </p>
              <a
                href="mailto:hello@befikrco.com"
                className="font-display text-xl font-bold text-foreground hover:text-primary transition-smooth"
                style={{ textDecoration: "none" }}
              >
                hello@befikrco.com
              </a>
            </div>

            {/* Hours */}
            <div>
              <p
                className="text-xs tracking-[0.3em] uppercase font-black mb-4"
                style={{ color: "var(--neon-orange)" }}
              >
                ✦ Drop Zone Hours
              </p>
              <p className="text-foreground/70 leading-relaxed text-base">
                Monday – Friday
                <br />
                10:00 AM – 6:00 PM IST
              </p>
            </div>

            {/* Socials */}
            <div>
              <p
                className="text-xs tracking-[0.3em] uppercase font-black mb-6"
                style={{ color: "var(--neon-lime)" }}
              >
                ✦ Slide Into Our DMs:
              </p>
              <div className="flex flex-col gap-5">
                {socials.map(({ label, icon: Icon, href, color, glow }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    data-ocid={`social-${label.toLowerCase().replace(/\W+/g, "-")}`}
                    className="inline-flex items-center gap-4 group"
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <span
                      className="w-10 h-10 flex items-center justify-center border transition-glow"
                      style={{ borderColor: "rgba(255,255,255,0.1)" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = glow;
                        (e.currentTarget as HTMLElement).style.borderColor =
                          color;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow =
                          "none";
                        (e.currentTarget as HTMLElement).style.borderColor =
                          "rgba(255,255,255,0.1)";
                      }}
                    >
                      <Icon size={18} style={{ color }} />
                    </span>
                    <span className="font-display font-bold text-sm tracking-widest uppercase text-foreground/60 group-hover:text-foreground transition-smooth">
                      {label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Returns policy card */}
            <div
              className="border p-8 relative overflow-hidden"
              style={{
                borderColor: "rgba(0,217,255,0.25)",
                background: "rgba(0,217,255,0.04)",
              }}
            >
              <div
                className="absolute top-0 right-0 w-24 h-24 blur-[40px] opacity-20 pointer-events-none"
                style={{ background: "var(--neon-cyan)" }}
              />
              <p
                className="text-xs tracking-[0.25em] uppercase font-black mb-3"
                style={{ color: "var(--neon-cyan)" }}
              >
                Returns & Sizing
              </p>
              <p className="text-foreground/60 leading-relaxed text-sm">
                We accept returns within 14 days of delivery. All products run
                true to size — when in doubt, size up.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

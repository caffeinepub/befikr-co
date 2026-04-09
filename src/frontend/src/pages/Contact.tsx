import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import { useState } from "react";
import { SiInstagram, SiTiktok, SiX } from "react-icons/si";
import { toast } from "sonner";

const socials = [
  {
    label: "Instagram",
    icon: SiInstagram,
    href: "https://instagram.com/befikrco",
  },
  { label: "X / Twitter", icon: SiX, href: "https://twitter.com/befikrco" },
  { label: "TikTok", icon: SiTiktok, href: "https://tiktok.com/@befikrco" },
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
    const errs = validate(form);
    setErrors(errs);
  };

  const handleChange = (field: keyof FormState, value: string) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    if (touched[field]) {
      setErrors(validate(updated));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, message: true };
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (errs.name || errs.email || errs.message) return;

    setSubmitting(true);
    setTimeout(() => {
      toast.success("Message sent!", { duration: 5000 });
      setForm({ name: "", email: "", message: "" });
      setTouched({});
      setErrors({ name: "", email: "", message: "" });
      setSubmitting(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <section className="bg-card border-b border-border py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.p
            className="text-xs tracking-widest uppercase text-muted-foreground mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Get in Touch
          </motion.p>
          <motion.h1
            className="font-display text-5xl md:text-6xl font-bold text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Contact.
          </motion.h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-7" noValidate>
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs tracking-widest uppercase text-muted-foreground mb-2"
                >
                  Name
                </label>
                <Input
                  id="name"
                  data-ocid="contact-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  onBlur={() => handleBlur("name")}
                  placeholder="Your name"
                  aria-invalid={touched.name && !!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={`rounded-none focus-visible:ring-0 focus-visible:border-foreground transition-smooth h-11 text-sm ${
                    touched.name && errors.name
                      ? "border-destructive focus-visible:border-destructive"
                      : "border-border"
                  }`}
                />
                {touched.name && errors.name && (
                  <p
                    id="name-error"
                    className="mt-1.5 text-xs text-destructive"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs tracking-widest uppercase text-muted-foreground mb-2"
                >
                  Email
                </label>
                <Input
                  id="email"
                  data-ocid="contact-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  placeholder="your@email.com"
                  aria-invalid={touched.email && !!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`rounded-none focus-visible:ring-0 focus-visible:border-foreground transition-smooth h-11 text-sm ${
                    touched.email && errors.email
                      ? "border-destructive focus-visible:border-destructive"
                      : "border-border"
                  }`}
                />
                {touched.email && errors.email && (
                  <p
                    id="email-error"
                    className="mt-1.5 text-xs text-destructive"
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs tracking-widest uppercase text-muted-foreground mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  data-ocid="contact-message"
                  rows={6}
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  onBlur={() => handleBlur("message")}
                  placeholder="What's on your mind?"
                  aria-invalid={touched.message && !!errors.message}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                  className={`w-full px-3 py-2.5 text-sm bg-background border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-smooth resize-none ${
                    touched.message && errors.message
                      ? "border-destructive"
                      : "border-border"
                  }`}
                />
                {touched.message && errors.message && (
                  <p
                    id="message-error"
                    className="mt-1.5 text-xs text-destructive"
                  >
                    {errors.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                data-ocid="contact-submit"
                disabled={submitting}
                className="w-full rounded-none h-12 text-xs tracking-widest uppercase font-semibold"
              >
                {submitting ? "Sending…" : "Send Message"}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-10"
          >
            <div>
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">
                Direct
              </p>
              <a
                href="mailto:hello@befikrco.com"
                className="text-sm text-foreground hover:text-muted-foreground transition-smooth"
              >
                hello@befikrco.com
              </a>
            </div>

            <div>
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">
                Hours
              </p>
              <p className="text-sm text-foreground leading-relaxed">
                Monday – Friday
                <br />
                10:00 AM – 6:00 PM IST
              </p>
            </div>

            <div>
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">
                Follow Us
              </p>
              <div className="flex flex-wrap gap-6">
                {socials.map(({ label, icon: Icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    data-ocid={`social-${label.toLowerCase().replace(/\W+/g, "-")}`}
                    className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-smooth group"
                  >
                    <Icon size={18} />
                    <span className="text-xs tracking-widest uppercase opacity-60 group-hover:opacity-100 transition-smooth">
                      {label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="border border-border p-6 bg-card">
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">
                Returns & Sizing
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We accept returns within 14 days of delivery. All products run
                true to size. When in doubt, size up.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

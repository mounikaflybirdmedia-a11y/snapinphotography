import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { z } from "zod";

const today = new Date();
today.setHours(0, 0, 0, 0);

const quoteSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(80, "Name is too long"),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(20, "Phone number is too long")
    .regex(/^[+\d][\d\s\-()]{6,}$/, "Only digits, spaces, +, -, () allowed"),
  date: z
    .string()
    .min(1, "Pick an event date")
    .refine((v) => !isNaN(Date.parse(v)) && new Date(v) >= today, "Date must be today or later"),
  city: z.string().trim().min(2, "Enter your city").max(60, "City is too long"),
});

type QuoteErrors = Partial<Record<"name" | "phone" | "date" | "city", string>>;

const eventTypes = [
  { id: "wedding", label: "Wedding", base: 85000 },
  { id: "prewedding", label: "Pre-Wedding", base: 25000 },
  { id: "engagement", label: "Engagement", base: 30000 },
  { id: "birthday", label: "Birthday / Event", base: 15000 },
  { id: "maternity", label: "Maternity / Portrait", base: 12000 },
];

const addons = [
  { id: "photo", label: "Photography", price: 0, included: true },
  { id: "cinema", label: "Cinematic Film", price: 25000 },
  { id: "drone", label: "Drone Coverage", price: 10000 },
  { id: "album", label: "Premium Printed Album", price: 8000 },
  { id: "teaser", label: "Same-day Teaser Reel", price: 6000 },
  { id: "extra", label: "Additional Photographer", price: 7000 },
];

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Build a Quote — Snap In Photography" },
      { name: "description", content: "Build your custom photography quotation in under a minute." },
    ],
  }),
  component: Quote,
});

function Quote() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [eventType, setEventType] = useState(eventTypes[0].id);
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [days, setDays] = useState(1);
  const [guests, setGuests] = useState("");
  const [selected, setSelected] = useState<string[]>(["photo"]);
  const [notes, setNotes] = useState("");

  const event = eventTypes.find((e) => e.id === eventType)!;

  const total = useMemo(() => {
    const addonTotal = addons
      .filter((a) => selected.includes(a.id))
      .reduce((s, a) => s + a.price, 0);
    return event.base * days + addonTotal;
  }, [event, days, selected]);

  const [errors, setErrors] = useState<QuoteErrors>({});

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const sendWhatsapp = () => {
    const result = quoteSchema.safeParse({ name, phone, date, city });
    if (!result.success) {
      const fieldErrors: QuoteErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof QuoteErrors;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      const first = document.querySelector<HTMLElement>("[data-error=\"true\"]");
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setErrors({});
    const data = result.data;
    const msg = `Hi Shiva (Snap In Photography), I'd like a quotation:

Name: ${data.name}
Phone: ${data.phone}
Event: ${event.label}
Date: ${data.date}
City: ${data.city}
Days: ${days}
Guests: ${guests || "—"}
Add-ons: ${addons.filter((a) => selected.includes(a.id)).map((a) => a.label).join(", ") || "—"}
Notes: ${notes || "—"}

Estimated total: ₹${total.toLocaleString("en-IN")}`;
    window.open(`https://wa.me/919550222229?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="container mx-auto px-6 py-24">
      <p className="text-xs uppercase tracking-[0.5em] text-primary mb-4">Quote Builder</p>
      <h1 className="font-display text-5xl md:text-6xl max-w-3xl leading-tight">
        Build your <span className="italic text-gradient-gold">quotation</span>.
      </h1>
      <p className="mt-6 text-muted-foreground max-w-xl">
        Tell us about your day. We'll open WhatsApp with your full quote prefilled.
      </p>

      <div className="mt-16 grid lg:grid-cols-3 gap-8">
        {/* FORM */}
        <div className="lg:col-span-2 space-y-10">
          <Section title="Your details">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full name" error={errors.name}>
                <input
                  value={name}
                  onChange={(e) => { setName(e.target.value); if (errors.name) setErrors({ ...errors, name: undefined }); }}
                  required
                  aria-invalid={!!errors.name}
                  className={inputCls(!!errors.name)}
                />
              </Field>
              <Field label="Phone / WhatsApp" error={errors.phone}>
                <input
                  type="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value); if (errors.phone) setErrors({ ...errors, phone: undefined }); }}
                  required
                  aria-invalid={!!errors.phone}
                  placeholder="+91 95502 22229"
                  className={inputCls(!!errors.phone)}
                />
              </Field>
            </div>
          </Section>

          <Section title="Event">
            <Field label="Type of event">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {eventTypes.map((e) => (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setEventType(e.id)}
                    className={`p-3 text-sm rounded-sm border text-left transition-colors ${
                      eventType === e.id
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border/60 hover:border-primary/40"
                    }`}
                  >
                    {e.label}
                  </button>
                ))}
              </div>
            </Field>
            <div className="grid sm:grid-cols-3 gap-4">
              <Field label="Date" error={errors.date}>
                <input
                  type="date"
                  value={date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => { setDate(e.target.value); if (errors.date) setErrors({ ...errors, date: undefined }); }}
                  required
                  aria-invalid={!!errors.date}
                  className={inputCls(!!errors.date)}
                />
              </Field>
              <Field label="City" error={errors.city}>
                <input
                  value={city}
                  onChange={(e) => { setCity(e.target.value); if (errors.city) setErrors({ ...errors, city: undefined }); }}
                  required
                  aria-invalid={!!errors.city}
                  placeholder="Khammam"
                  className={inputCls(!!errors.city)}
                />
              </Field>
              <Field label="Days of coverage">
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={days}
                  onChange={(e) => setDays(Math.max(1, +e.target.value || 1))}
                  className={input}
                />
              </Field>
            </div>
            <Field label="Approx guests (optional)">
              <input value={guests} onChange={(e) => setGuests(e.target.value)} className={input} />
            </Field>
          </Section>

          <Section title="Add-ons">
            <div className="grid sm:grid-cols-2 gap-3">
              {addons.map((a) => {
                const active = selected.includes(a.id);
                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => !a.included && toggle(a.id)}
                    disabled={a.included}
                    className={`flex justify-between p-4 rounded-sm border text-left transition-colors ${
                      active
                        ? "border-primary bg-primary/10"
                        : "border-border/60 hover:border-primary/40"
                    } ${a.included ? "opacity-90 cursor-default" : ""}`}
                  >
                    <div>
                      <div className="text-sm">{a.label}</div>
                      {a.included && <div className="text-[10px] uppercase tracking-[0.3em] text-primary mt-1">Included</div>}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {a.price ? `+₹${a.price.toLocaleString("en-IN")}` : "—"}
                    </div>
                  </button>
                );
              })}
            </div>
          </Section>

          <Section title="Anything else?">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Specific traditions, locations, vibe references…"
              className={input}
            />
          </Section>
        </div>

        {/* SUMMARY */}
        <aside className="lg:sticky lg:top-28 self-start p-8 border border-primary/30 rounded-sm bg-card shadow-deep">
          <h3 className="text-xs uppercase tracking-[0.4em] text-primary">Estimate</h3>
          <div className="mt-4 font-display text-5xl text-gradient-gold">
            ₹{total.toLocaleString("en-IN")}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Indicative · final quote confirmed on WhatsApp
          </p>

          <div className="mt-6 space-y-2 text-sm">
            <Row label={`${event.label} × ${days} day${days > 1 ? "s" : ""}`} value={`₹${(event.base * days).toLocaleString("en-IN")}`} />
            {addons
              .filter((a) => selected.includes(a.id) && a.price > 0)
              .map((a) => (
                <Row key={a.id} label={a.label} value={`+₹${a.price.toLocaleString("en-IN")}`} />
              ))}
          </div>

          <button
            onClick={sendWhatsapp}
            className="mt-8 w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-gold text-primary-foreground rounded-sm font-medium shadow-gold hover:scale-[1.01] transition-transform"
          >
            <MessageCircle className="size-4" /> Send on WhatsApp <ArrowRight className="size-4" />
          </button>
          <p className="text-[11px] text-muted-foreground mt-4 text-center">
            Opens WhatsApp with your full quote prefilled.
          </p>
        </aside>
      </div>
    </div>
  );
}

const input =
  "w-full px-4 py-3 bg-background border border-border/60 rounded-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/40 transition-colors";

const inputCls = (hasError: boolean) =>
  `w-full px-4 py-3 bg-background border rounded-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 transition-colors ${
    hasError
      ? "border-destructive focus:border-destructive focus:ring-destructive/40"
      : "border-border/60 focus:border-primary focus:ring-primary/40"
  }`;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-5">
      <h2 className="font-display text-2xl">{title}</h2>
      {children}
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block" data-error={error ? "true" : undefined}>
      <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2">{label}</div>
      {children}
      {error && <div className="mt-1.5 text-xs text-destructive">{error}</div>}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-muted-foreground border-b border-border/40 pb-2">
      <span>{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}

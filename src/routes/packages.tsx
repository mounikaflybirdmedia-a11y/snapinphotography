import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

const packages = [
  {
    name: "Essential",
    price: "₹35,000",
    tagline: "Intimate ceremonies & small events",
    features: [
      "1 photographer · 6 hours",
      "150+ retouched photos",
      "Online gallery",
      "30-second highlight reel",
    ],
  },
  {
    name: "Signature",
    price: "₹85,000",
    tagline: "Most loved · full wedding day",
    features: [
      "2 photographers + 1 cinematographer",
      "Full-day coverage (12 hrs)",
      "400+ retouched photos",
      "3–4 minute cinematic film",
      "Pre-wedding shoot included",
      "Premium printed album",
    ],
    featured: true,
  },
  {
    name: "Heirloom",
    price: "Custom",
    tagline: "Multi-day weddings & destinations",
    features: [
      "Multi-day coverage",
      "Full creative team",
      "Cinematic feature film",
      "Drone & gimbal coverage",
      "Luxury heirloom album",
      "Travel & stay arranged",
    ],
  },
];

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Packages — Snap In Photography" },
      { name: "description", content: "Photography & cinematography packages starting from ₹35,000." },
    ],
  }),
  component: Packages,
});

function Packages() {
  return (
    <div className="container mx-auto px-6 py-24">
      <p className="text-xs uppercase tracking-[0.5em] text-primary mb-4">Packages</p>
      <h1 className="font-display text-5xl md:text-7xl max-w-3xl leading-tight">
        Honest pricing,<br /><span className="italic text-gradient-gold">extraordinary</span> craft.
      </h1>
      <p className="mt-6 text-muted-foreground max-w-xl">
        Indicative pricing — every story is different. Use the quote builder for an exact estimate.
      </p>

      <div className="mt-20 grid md:grid-cols-3 gap-6">
        {packages.map((p) => (
          <div
            key={p.name}
            className={`relative p-8 rounded-sm border ${
              p.featured
                ? "border-primary bg-card shadow-gold"
                : "border-border/60 bg-card/50"
            }`}
          >
            {p.featured && (
              <div className="absolute -top-3 left-8 px-3 py-1 text-[10px] uppercase tracking-[0.3em] bg-gradient-gold text-primary-foreground rounded-sm">
                Most chosen
              </div>
            )}
            <h3 className="font-display text-3xl">{p.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{p.tagline}</p>
            <div className="mt-6 font-display text-4xl text-gradient-gold">{p.price}</div>
            <ul className="mt-8 space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex gap-3 text-sm text-muted-foreground">
                  <Check className="size-4 text-primary mt-0.5 shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <Link
              to="/quote"
              className={`mt-8 block text-center py-3 rounded-sm font-medium ${
                p.featured
                  ? "bg-gradient-gold text-primary-foreground"
                  : "border border-primary/40 text-primary hover:bg-primary/10"
              }`}
            >
              Get Quote
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

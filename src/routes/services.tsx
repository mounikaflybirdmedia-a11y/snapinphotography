import { createFileRoute, Link } from "@tanstack/react-router";
import wedding from "@/assets/wedding.jpg";
import prewedding from "@/assets/prewedding.jpg";
import event from "@/assets/event.jpg";
import portrait from "@/assets/portrait.jpg";

const services = [
  {
    img: wedding,
    title: "Weddings",
    desc: "Full-day candid coverage — haldi, mehendi, ceremony, reception. Photo + cinematic film.",
    includes: ["2–3 photographers", "Cinematic wedding film", "Pre-edited highlights reel", "Curated album"],
  },
  {
    img: prewedding,
    title: "Pre-Wedding & Engagement",
    desc: "A romantic shoot at locations of your choice — beach, palace, countryside.",
    includes: ["Half / full day shoot", "1–2 outfit changes", "Cinematic teaser video", "50+ retouched photos"],
  },
  {
    img: event,
    title: "Events & Birthdays",
    desc: "Birthdays, anniversaries, corporate functions — captured with energy and warmth.",
    includes: ["3–6 hour coverage", "Candid + group portraits", "Same-day previews", "Reels for socials"],
  },
  {
    img: portrait,
    title: "Maternity & Portraits",
    desc: "Studio or outdoor sessions for maternity, baby, and family portraits.",
    includes: ["Studio + outdoor", "Outfit consultation", "Retouched portraits", "Print-ready files"],
  },
];

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Snap In Photography" },
      { name: "description", content: "Wedding, pre-wedding, events and portrait photography services." },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <div className="container mx-auto px-6 py-24">
      <p className="text-xs uppercase tracking-[0.5em] text-primary mb-4">Services</p>
      <h1 className="font-display text-5xl md:text-7xl max-w-3xl leading-tight">
        What we do <span className="italic text-gradient-gold">best</span>.
      </h1>

      <div className="mt-20 space-y-24">
        {services.map((s, i) => (
          <article key={s.title} className={`grid md:grid-cols-12 gap-10 items-center ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
            <div className="md:col-span-6">
              <img src={s.img} alt={s.title} loading="lazy" className="w-full aspect-[4/5] object-cover rounded-sm shadow-deep" />
            </div>
            <div className="md:col-span-6">
              <h2 className="font-display text-4xl md:text-5xl mb-4">{s.title}</h2>
              <p className="text-muted-foreground text-lg mb-6">{s.desc}</p>
              <ul className="space-y-2 mb-8">
                {s.includes.map((it) => (
                  <li key={it} className="flex gap-3 text-muted-foreground">
                    <span className="text-primary mt-1">—</span> {it}
                  </li>
                ))}
              </ul>
              <Link
                to="/quote"
                className="inline-flex px-6 py-3 bg-gradient-gold text-primary-foreground rounded-sm font-medium"
              >
                Quote this service
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

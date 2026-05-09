import { createFileRoute } from "@tanstack/react-router";
import g1 from "@/assets/gallery1.jpg";
import g2 from "@/assets/gallery2.jpg";
import g3 from "@/assets/gallery3.jpg";
import wedding from "@/assets/wedding.jpg";
import prewedding from "@/assets/prewedding.jpg";
import portrait from "@/assets/portrait.jpg";
import event from "@/assets/event.jpg";
import hero from "@/assets/hero.jpg";

const shots = [
  { src: hero, span: "md:col-span-2 md:row-span-2", alt: "Bride by candlelight" },
  { src: g1, span: "", alt: "Couple under fairy lights" },
  { src: g2, span: "", alt: "Haldi hands" },
  { src: prewedding, span: "md:row-span-2", alt: "Sunset silhouette" },
  { src: wedding, span: "", alt: "Ring exchange" },
  { src: g3, span: "", alt: "Sangeet dance" },
  { src: event, span: "md:col-span-2", alt: "Sparklers cake" },
  { src: portrait, span: "", alt: "Maternity portrait" },
];

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Snap In Photography" },
      { name: "description", content: "A selection of our favourite frames from weddings, events and portraits." },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  return (
    <div className="container mx-auto px-6 py-24">
      <p className="text-xs uppercase tracking-[0.5em] text-primary mb-4">Portfolio</p>
      <h1 className="font-display text-5xl md:text-7xl max-w-3xl leading-tight">
        Frames we'd <span className="italic text-gradient-gold">hang on a wall</span>.
      </h1>

      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 md:auto-rows-[220px]">
        {shots.map((s, i) => (
          <figure key={i} className={`relative overflow-hidden rounded-sm group ${s.span}`}>
            <img
              src={s.src}
              alt={s.alt}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors" />
          </figure>
        ))}
      </div>
    </div>
  );
}

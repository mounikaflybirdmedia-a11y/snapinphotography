import { createFileRoute } from "@tanstack/react-router";
import portrait from "@/assets/portrait.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Snap In Photography" },
      { name: "description", content: "Meet Shiva — founder of Snap In Photography in Khammam, and still photographer for Ayana Movies." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="container mx-auto px-6 py-24">
      <p className="text-xs uppercase tracking-[0.5em] text-primary mb-4">About the studio</p>
      <h1 className="font-display text-5xl md:text-7xl max-w-4xl leading-tight">
        Crafted with <span className="italic text-gradient-gold">quiet obsession</span>.
      </h1>

      <div className="mt-20 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <img src={portrait} alt="Studio portrait" loading="lazy" className="w-full rounded-sm shadow-deep" />
        </div>
        <div className="md:col-span-7 space-y-6 text-lg text-muted-foreground leading-relaxed">
          <p>
            I'm <span className="text-foreground">Shiva</span>, the eyes behind
            Snap In Photography. Born and raised in Khammam, I picked up a camera years ago to keep
            family memories alive — and never put it down.
          </p>
          <p>
            Today, our small team shoots weddings, pre-weddings, birthdays, and intimate
            portraits across Telangana and beyond. Every frame is treated like a keepsake,
            never a transaction.
          </p>
          <p>
            We've also had the privilege of being the on-set still photography team for
            <span className="text-foreground"> Ayana Movies</span>, contributing to the Telugu
            feature films <span className="text-foreground">Bimla Nayak</span>,
            <span className="text-foreground"> Jai Hanuman</span> and
            <span className="text-foreground"> Nagabandam</span>.
          </p>
          <p>
            We believe in candid emotion over forced poses, in patient light over flashy filters,
            and in films that feel like memory — not a montage.
          </p>

          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/40">
            {[
              { n: "200+", l: "Weddings" },
              { n: "3", l: "Feature films" },
              { n: "15+", l: "Cities covered" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-3xl text-gradient-gold">{s.n}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

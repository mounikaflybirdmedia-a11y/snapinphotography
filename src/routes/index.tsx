import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Camera, Heart, Sparkles } from "lucide-react";
import hero from "@/assets/hero.jpg";
import wedding from "@/assets/wedding.jpg";
import prewedding from "@/assets/prewedding.jpg";
import portrait from "@/assets/portrait.jpg";
import event from "@/assets/event.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Snap In Photography — Wedding & Film Stills Photography Khammam" },
      { name: "description", content: "Cinematic wedding, pre-wedding, events & portrait photography in Khammam, Telangana. Still photography for Ayana Movies." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <img
          src={hero}
          alt="Bride in red lehenga lit by candlelight"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
        <div className="absolute inset-0 grain" />

        <div className="container relative mx-auto px-6 fade-up">
          <p className="text-xs uppercase tracking-[0.5em] text-primary mb-6">Khammam · Telangana · India</p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.05] max-w-4xl">
            We capture <span className="italic text-gradient-gold">moments</span>,
            <br /> freezing your memories.
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground">
            Cinematic photography & films for weddings, pre-weddings, events and portraits —
            crafted with quiet obsession by Shiva. Still photography team behind Ayana Movies'
            Bimla Nayak, Jai Hanuman & Nagabandam.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/quote"
              className="group inline-flex items-center gap-2 px-7 py-4 bg-gradient-gold text-primary-foreground rounded-sm font-medium shadow-gold hover:scale-[1.02] transition-transform"
            >
              Build Your Quotation
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-7 py-4 border border-primary/40 text-foreground rounded-sm hover:bg-primary/10 transition-colors"
            >
              View Portfolio
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.4em] text-muted-foreground animate-pulse">
          scroll
        </div>
      </section>

      {/* INTRO */}
      <section className="container mx-auto px-6 py-32 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-5">
          <p className="text-xs uppercase tracking-[0.4em] text-primary mb-4">The Studio</p>
          <h2 className="text-4xl md:text-5xl font-display leading-tight">
            A storyteller behind the lens.
          </h2>
        </div>
        <div className="md:col-span-7 space-y-6 text-muted-foreground text-lg leading-relaxed">
          <p>
            Snap In Photography is a boutique photography & film studio based in Khammam, led by Shiva.
            For us, photography isn't a service — it's a craft of holding time still.
          </p>
          <p>
            Beyond weddings, our team has worked as still photographers on Ayana Movies productions —
            including the Telugu features <span className="text-foreground">Bimla Nayak</span>,
            <span className="text-foreground"> Jai Hanuman</span> and
            <span className="text-foreground"> Nagabandam</span>.
          </p>
          <p>
            From the first whisper of haldi to the last blur of a sangeet dance floor, we shoot
            unhurried, intimate frames you'll keep returning to.
          </p>
          <Link to="/about" className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all">
            Read our story <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <div className="hairline container mx-auto" />

      {/* SERVICES PREVIEW */}
      <section className="container mx-auto px-6 py-32">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-16">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-primary mb-3">What we shoot</p>
            <h2 className="text-4xl md:text-5xl font-display">Stories we love telling</h2>
          </div>
          <Link to="/services" className="text-primary inline-flex items-center gap-2 hover:gap-3 transition-all">
            All services <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { img: wedding, title: "Weddings", icon: Heart },
            { img: prewedding, title: "Pre-Wedding", icon: Sparkles },
            { img: event, title: "Events & Birthdays", icon: Camera },
            { img: portrait, title: "Maternity & Portraits", icon: Camera },
          ].map((s) => (
            <article key={s.title} className="group relative aspect-[3/4] overflow-hidden rounded-sm border border-border/50">
              <img
                src={s.img}
                alt={s.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <s.icon className="size-5 text-primary mb-3" />
                <h3 className="font-display text-2xl">{s.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-32">
        <div className="relative rounded-sm overflow-hidden border border-primary/30 bg-card p-12 md:p-20 text-center shadow-deep">
          <div className="absolute inset-0 bg-gradient-radial opacity-50" />
          <div className="relative">
            <p className="text-xs uppercase tracking-[0.5em] text-primary mb-6">Ready when you are</p>
            <h2 className="text-4xl md:text-6xl font-display max-w-3xl mx-auto leading-tight">
              Let's craft your <span className="text-gradient-gold italic">snap in</span> story.
            </h2>
            <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
              Build a custom quotation in under a minute. We'll reply on WhatsApp instantly.
            </p>
            <Link
              to="/quote"
              className="mt-10 inline-flex items-center gap-2 px-8 py-4 bg-gradient-gold text-primary-foreground rounded-sm font-medium shadow-gold"
            >
              Build Your Quotation <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

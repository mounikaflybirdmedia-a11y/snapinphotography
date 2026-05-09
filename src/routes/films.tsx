import { createFileRoute } from "@tanstack/react-router";
import { Film, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import bimla from "@/assets/film-bimlanayak.jpg";
import jai from "@/assets/film-jaihanuman.jpg";
import naga from "@/assets/film-nagabandam.jpg";

const films = [
  {
    title: "Bimla Nayak",
    year: "Telugu Feature",
    blurb:
      "On-set stills capturing the rugged, earth-toned world of a tribal warrior chieftain — golden hour, smoke and steel.",
    img: bimla,
  },
  {
    title: "Jai Hanuman",
    year: "Telugu Feature",
    blurb:
      "Mythological epic stills — silhouettes against blazing skies, devotional drama, and motion frozen mid-flight.",
    img: jai,
  },
  {
    title: "Nagabandam",
    year: "Telugu Feature",
    blurb:
      "Supernatural mystery stills — candlelit sanctums, eerie greens, and slow-burning suspense from inside the temple.",
    img: naga,
  },
];

export const Route = createFileRoute("/films")({
  head: () => ({
    meta: [
      { title: "Film Stills — Snap In Photography" },
      {
        name: "description",
        content:
          "On-set still photography by Snap In Photography for Ayana Movies' Telugu features Bimla Nayak, Jai Hanuman and Nagabandam.",
      },
      { property: "og:title", content: "Film Stills — Snap In Photography" },
      {
        property: "og:description",
        content:
          "On-set still photography for Telugu features Bimla Nayak, Jai Hanuman and Nagabandam.",
      },
    ],
  }),
  component: Films,
});

function Films() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const close = useCallback(() => setLightbox(null), []);
  const next = useCallback(
    () => setLightbox((i) => (i === null ? i : (i + 1) % films.length)),
    [],
  );
  const prev = useCallback(
    () => setLightbox((i) => (i === null ? i : (i - 1 + films.length) % films.length)),
    [],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightbox, close, next, prev]);

  return (
    <div className="container mx-auto px-6 py-24">
      <p className="text-xs uppercase tracking-[0.5em] text-primary mb-4 inline-flex items-center gap-2">
        <Film className="size-3.5" /> Film Stills
      </p>
      <h1 className="font-display text-5xl md:text-7xl max-w-4xl leading-tight">
        On set with <span className="italic text-gradient-gold">Ayana Movies</span>.
      </h1>
      <p className="mt-6 text-muted-foreground max-w-2xl text-lg">
        A selection of unit stills shot by our team across three Telugu features —
        Bimla Nayak, Jai Hanuman and Nagabandam. Frames pulled from the chaos of a
        live set, lit by the same light the cameras saw.
      </p>

      <div className="mt-20 space-y-24">
        {films.map((f, i) => (
          <article
            key={f.title}
            className={`grid md:grid-cols-12 gap-10 items-center ${
              i % 2 === 1 ? "md:[&>figure]:order-2" : ""
            }`}
          >
            <figure className="md:col-span-7 relative overflow-hidden rounded-sm border border-border/50 group">
              <button
                type="button"
                onClick={() => setLightbox(i)}
                aria-label={`View still from ${f.title} larger`}
                className="block w-full h-full cursor-zoom-in"
              >
                <img
                  src={f.img}
                  alt={`Still from ${f.title}`}
                  width={1280}
                  height={800}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 right-4 px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] bg-background/70 backdrop-blur-sm text-primary rounded-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  View larger
                </div>
              </button>
            </figure>
            <div className="md:col-span-5 space-y-4">
              <div className="text-xs uppercase tracking-[0.4em] text-primary">{f.year}</div>
              <h2 className="font-display text-4xl md:text-5xl text-gradient-gold">{f.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{f.blurb}</p>
              <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground pt-2">
                Production · Ayana Movies
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-32 p-10 md:p-14 border border-primary/30 rounded-sm bg-card text-center shadow-deep">
        <h3 className="font-display text-3xl md:text-4xl">
          Need a unit stills photographer for your set?
        </h3>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          We travel across Telangana and beyond for feature films, ad shoots, and music videos.
          Reach Shiva directly on WhatsApp.
        </p>
        <a
          href="https://wa.me/919550222229"
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-gradient-gold text-primary-foreground rounded-sm font-medium shadow-gold"
        >
          Talk on WhatsApp
        </a>
      </div>

      {lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Still from ${films[lightbox].title}`}
          onClick={close}
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-10 animate-in fade-in"
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); close(); }}
            aria-label="Close"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 size-11 grid place-items-center rounded-full border border-border/60 bg-card/60 hover:border-primary text-foreground hover:text-primary transition-colors"
          >
            <X className="size-5" />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous still"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 size-11 grid place-items-center rounded-full border border-border/60 bg-card/60 hover:border-primary text-foreground hover:text-primary transition-colors"
          >
            <ChevronLeft className="size-5" />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next still"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 size-11 grid place-items-center rounded-full border border-border/60 bg-card/60 hover:border-primary text-foreground hover:text-primary transition-colors"
          >
            <ChevronRight className="size-5" />
          </button>

          <figure
            onClick={(e) => e.stopPropagation()}
            className="max-w-6xl w-full flex flex-col items-center gap-4"
          >
            <img
              src={films[lightbox].img}
              alt={`Still from ${films[lightbox].title}`}
              width={1280}
              height={800}
              className="max-h-[78vh] w-auto object-contain rounded-sm shadow-deep border border-border/40"
            />
            <figcaption className="text-center">
              <div className="font-display text-2xl text-gradient-gold">
                {films[lightbox].title}
              </div>
              <div className="text-xs uppercase tracking-[0.4em] text-muted-foreground mt-1">
                {films[lightbox].year} · Ayana Movies · {lightbox + 1} / {films.length}
              </div>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}

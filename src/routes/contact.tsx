import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, MessageCircle, Instagram } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Snap In Photography" },
      { name: "description", content: "Reach Snap In Photography studio in Khammam, Telangana." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="container mx-auto px-6 py-24">
      <p className="text-xs uppercase tracking-[0.5em] text-primary mb-4">Contact</p>
      <h1 className="font-display text-5xl md:text-7xl max-w-3xl leading-tight">
        Say <span className="italic text-gradient-gold">hello</span>.
      </h1>
      <p className="mt-6 text-muted-foreground max-w-xl text-lg">
        Tell us about your day. We reply fastest on WhatsApp.
      </p>

      <div className="mt-16 grid md:grid-cols-2 gap-6">
        {[
          { icon: MessageCircle, label: "WhatsApp", value: "+91 95502 22229", href: "https://wa.me/919550222229" },
          { icon: Phone, label: "Call", value: "+91 95502 22229", href: "tel:+919550222229" },
          { icon: Mail, label: "Email", value: "hello@snapinphotography.in", href: "mailto:hello@snapinphotography.in" },
          { icon: Instagram, label: "Instagram", value: "@snapinphotography", href: "https://instagram.com" },
        ].map((c) => (
          <a
            key={c.label}
            href={c.href}
            target="_blank"
            rel="noreferrer"
            className="group p-8 border border-border/60 hover:border-primary/60 rounded-sm bg-card/40 transition-colors"
          >
            <c.icon className="size-6 text-primary mb-4" />
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{c.label}</div>
            <div className="mt-2 text-lg group-hover:text-primary transition-colors break-words">{c.value}</div>
          </a>
        ))}
      </div>

      <div className="mt-16 p-8 border border-border/60 rounded-sm bg-card/40 flex gap-4 items-start">
        <MapPin className="size-6 text-primary mt-1" />
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Studio</div>
          <div className="mt-2 text-lg">Vijaynagar Colony, Khammam, Telangana 507002, India</div>
          <div className="text-sm text-muted-foreground mt-1">Asia/Kolkata · By appointment</div>
        </div>
      </div>
    </div>
  );
}

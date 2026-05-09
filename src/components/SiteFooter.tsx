import { Link } from "@tanstack/react-router";
import { Instagram, Phone, Mail, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative mt-32 border-t border-border/40 bg-card/30">
      <div className="container mx-auto px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-2xl text-gradient-gold mb-2">Snap In Photography</div>
          <p className="text-sm text-muted-foreground max-w-md">
            We capture moments, freezing your memories. Cinematic photography & films
            crafted with love from Khammam, Telangana — also the still photography team
            behind Ayana Movies' Bimla Nayak, Jai Hanuman & Nagabandam.
          </p>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-[0.25em] text-primary mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/services" className="hover:text-primary">Services</Link></li>
            <li><Link to="/portfolio" className="hover:text-primary">Portfolio</Link></li>
            <li><Link to="/films" className="hover:text-primary">Film Stills</Link></li>
            <li><Link to="/packages" className="hover:text-primary">Packages</Link></li>
            <li><Link to="/quote" className="hover:text-primary">Get Quote</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-[0.25em] text-primary mb-4">Studio</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2"><MapPin className="size-4 mt-0.5 text-primary" /> Vijaynagar Colony, Khammam, Telangana 507002</li>
            <li className="flex gap-2"><Phone className="size-4 mt-0.5 text-primary" /> <a href="tel:+919550222229" className="hover:text-primary">+91 95502 22229</a></li>
            <li className="flex gap-2"><Mail className="size-4 mt-0.5 text-primary" /> <a href="mailto:hello@snapinphotography.in" className="hover:text-primary break-all">hello@snapinphotography.in</a></li>
            <li className="flex gap-2"><Instagram className="size-4 mt-0.5 text-primary" /> @snapinphotography</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/40 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Snap In Photography · snapinphotography.in · All rights reserved.
      </div>
    </footer>
  );
}

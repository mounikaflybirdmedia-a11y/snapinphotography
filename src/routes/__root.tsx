import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Snap In Photography — Cinematic Wedding & Film Stills Photography Khammam" },
      { name: "description", content: "Snap In Photography by Shiva — wedding, pre-wedding, events & maternity photography in Khammam, Telangana. Still photography for Ayana Movies (Bimla Nayak, Jai Hanuman, Nagabandam)." },
      { name: "author", content: "Shiva" },
      { property: "og:title", content: "Snap In Photography — Cinematic Wedding & Film Stills Photography Khammam" },
      { property: "og:description", content: "Snap In Photography by Shiva — wedding, pre-wedding, events & maternity photography in Khammam, Telangana. Still photography for Ayana Movies (Bimla Nayak, Jai Hanuman, Nagabandam)." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Snap In Photography — Cinematic Wedding & Film Stills Photography Khammam" },
      { name: "twitter:description", content: "Snap In Photography by Shiva — wedding, pre-wedding, events & maternity photography in Khammam, Telangana. Still photography for Ayana Movies (Bimla Nayak, Jai Hanuman, Nagabandam)." },
    ],
    links: [
      {
        rel: "icon",
        type: "image/png",
        href: "/favicon.png",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}

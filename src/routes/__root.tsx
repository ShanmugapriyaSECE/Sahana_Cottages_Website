import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Toaster } from "@/components/ui/sonner";

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

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Best Cottages in Yercaud | Sahana Cottages Yercaud" },
      { name: "description", content: "Book affordable cottages in Yercaud near tourist places. Best budget rooms in Yercaud for family stay with modern amenities and scenic surroundings." },
      { name: "keywords", content: "Yercaud cottages, cottages in Yercaud, best stay in Yercaud, Yercaud homestay, budget cottages Yercaud" },
      { name: "author", content: "Sahana Cottages Yercaud" },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Best Cottages in Yercaud | Sahana Cottages Yercaud" },
      { property: "og:description", content: "Affordable, peaceful, and family-friendly cottages in Yercaud with beautiful hill views. Book direct for best rates." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://sahanacottagesyercaud.com" },
      { property: "og:image", content: "https://sahanacottagesyercaud.com/logo1.png" },
      { name: "google-site-verification", content: "YOUR_GOOGLE_SITE_VERIFICATION_KEY_HERE" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Best Cottages in Yercaud | Sahana Cottages Yercaud" },
      { name: "twitter:description", content: "Book affordable cottages in Yercaud with scenic views. Best family stay in Yercaud." },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <HeadContent />
        {/* Google Analytics (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_MEASUREMENT_ID_HERE"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-YOUR_MEASUREMENT_ID_HERE');
            `,
          }}
        />
        {/* JSON-LD Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Hotel",
              "name": "Sahana Cottages Yercaud",
              "telephone": "+919150507580",
              "url": "https://sahanacottagesyercaud.com",
              "logo": "https://sahanacottagesyercaud.com/logo1.png",
              "image": "https://sahanacottagesyercaud.com/logo1.png",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Near Yercaud Lake",
                "addressLocality": "Yercaud",
                "addressRegion": "Tamil Nadu",
                "postalCode": "636601",
                "addressCountry": "India"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 11.778843,
                "longitude": 78.209121
              },
              "hasMap": "https://www.google.com/maps?q=11.778843,78.209121",
              "sameAs": [
                "https://www.google.com/maps?q=11.778843,78.209121"
              ],
              "description": "Best cottages in Yercaud for family stay with scenic views and affordable pricing.",
              "priceRange": "$$",
              "amenityFeature": [
                {"@type": "LocationFeatureSpecification", "name": "Free Parking"},
                {"@type": "LocationFeatureSpecification", "name": "Family Rooms"},
                {"@type": "LocationFeatureSpecification", "name": "Scenic Views"}
              ]
            })
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster richColors position="top-center" />
    </QueryClientProvider>
  );
}

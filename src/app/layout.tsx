import type { Metadata, Viewport } from "next";
import { Figtree, Fraunces } from "next/font/google";
import Script from "next/script";
import TrailMap from "@/components/TrailMap";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

const SITE_URL = "https://portfolio-mu-ebon-31.vercel.app";
const SITE_TITLE = "Pranoti Varpe | Full-Stack Software Developer";
const SITE_DESCRIPTION =
  "Pranoti Varpe is a full-stack developer in Pune building web apps with React, Node.js, Java Spring Boot and PostgreSQL.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "Pranoti Varpe",
    "Software Developer",
    "Full-Stack Developer",
    "React",
    "Node.js",
    "Spring Boot",
    "Pune",
  ],
  authors: [{ name: "Pranoti Varpe", url: SITE_URL }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Pranoti Varpe",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#0c111c",
  colorScheme: "dark light",
};

const THEME_INIT_SCRIPT = `
  (function () {
    var stored = localStorage.getItem("theme");
    // Night is the default look; a saved choice always wins.
    var isDark = stored ? stored === "dark" : true;
    document.documentElement.classList.toggle("dark", isDark);
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${figtree.variable} ${fraunces.variable} h-full antialiased`}
    >
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a
          href="#main"
          className="sr-only rounded-full bg-accent px-4 py-2 font-semibold text-accent-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60]"
        >
          Skip to content
        </a>
        {children}
        <TrailMap />
      </body>
    </html>
  );
}

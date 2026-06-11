import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { CursorTrail } from "./components/cursor-trail";
import { ThemeProvider } from "./components/theme-provider";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Shoaib Khan — Staff AI Engineer",
    template: "%s | Shoaib Khan",
  },
  description:
    "Staff AI engineer building agents, ML systems, and the production infrastructure behind them.",
  metadataBase: new URL("https://shoaibkhanz.github.io/ai-engineering-blog"),
  openGraph: {
    siteName: "Shoaib Khan — Staff AI Engineer",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
  },
  alternates: {
    types: {
      "application/rss+xml": "/ai-engineering-blog/feed.xml",
    },
  },
};

// Inline script to set theme before first paint (prevents flash)
const themeScript = `(function(){document.documentElement.classList.add('no-transitions');try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t)}else{document.documentElement.setAttribute('data-theme','dark')}}catch(e){document.documentElement.setAttribute('data-theme','dark')}requestAnimationFrame(function(){requestAnimationFrame(function(){document.documentElement.classList.remove('no-transitions')})})})()`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={spaceMono.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <a href="#main-content" className="skip-link">
            $ skip --to-content
          </a>
          <CursorTrail />
          <Header />
          <main id="main-content" className="flex-1 relative z-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

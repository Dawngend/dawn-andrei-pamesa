import type { Metadata, Viewport } from "next";
import "./globals.css";

const title = "Dawn Andrei Pamesa";
const description =
  "AI/ML engineer and backend systems architect — portfolio and selected work.";

export const metadata: Metadata = {
  title,
  description,
  applicationName: title,
  authors: [{ name: title }],
  keywords: [
    "AI engineer",
    "machine learning engineer",
    "backend systems architect",
    "RAG",
    "ChromaDB",
    "PyTorch",
    "ROCm",
    "FastAPI",
    "Dawn Andrei Pamesa",
  ],
  openGraph: {
    type: "website",
    title,
    description,
    siteName: title,
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
  // Icons come from the file conventions: `app/favicon.ico` (raster fallback)
  // and `app/icon.svg` (the blueprint mark). The same SVG is also served at
  // /favicon.svg from `public/` for anything that asks for it by that name.
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1ead9" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1b30" },
  ],
};

/**
 * Applies the stored theme before first paint so a dark-mode visitor never
 * sees a cream flash. Kept tiny and dependency-free on purpose.
 */
const themeBootstrap = `(function(){try{var t=localStorage.getItem("dap-theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t)}}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The bootstrap script below sets `data-theme` before React hydrates, so the
    // server markup intentionally disagrees with the client on this one element.
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}

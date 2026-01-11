import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ReviewPro - סיקורי מוצרים מקיפים",
    template: "%s | ReviewPro",
  },
  description:
    "סיקורי מוצרים מקיפים ואמינים. השוואת מחירים, ביקורות צרכנים, ומידע טכני מכל המקורות במקום אחד.",
  keywords: [
    "סיקורים",
    "ביקורות מוצרים",
    "השוואת מחירים",
    "מוצרי טכנולוגיה",
    "מוצרי תינוקות",
    "המלצות קנייה",
  ],
  authors: [{ name: "ReviewPro" }],
  openGraph: {
    type: "website",
    locale: "he_IL",
    siteName: "ReviewPro",
    title: "ReviewPro - סיקורי מוצרים מקיפים",
    description:
      "סיקורי מוצרים מקיפים ואמינים. השוואת מחירים, ביקורות צרכנים, ומידע טכני.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReviewPro - סיקורי מוצרים מקיפים",
    description: "סיקורי מוצרים מקיפים ואמינים",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        {/* Header */}
        <header className="sticky top-0 z-50 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--border)]">
          <div className="container flex items-center justify-between h-16">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold gradient-text">
                ReviewPro
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <a
                href="/category/tech"
                className="text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
              >
                טכנולוגיה
              </a>
              <a
                href="/category/baby"
                className="text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
              >
                מוצרי תינוקות
              </a>
              <a
                href="/compare"
                className="text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
              >
                השוואה
              </a>
            </nav>

            {/* Search Button */}
            <button className="btn btn-outline hidden md:flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <span>חיפוש</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="min-h-[calc(100vh-4rem-5rem)]">{children}</main>

        {/* Footer */}
        <footer className="border-t border-[var(--border)] py-8 mt-12 mb-16 md:mb-0">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-semibold mb-4">קטגוריות</h3>
                <ul className="space-y-2 text-[var(--foreground-secondary)]">
                  <li>
                    <a href="/category/tech">טכנולוגיה</a>
                  </li>
                  <li>
                    <a href="/category/baby">מוצרי תינוקות</a>
                  </li>
                  <li>
                    <a href="/category/home">בית וגינה</a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">מידע</h3>
                <ul className="space-y-2 text-[var(--foreground-secondary)]">
                  <li>
                    <a href="/about">אודות</a>
                  </li>
                  <li>
                    <a href="/contact">צור קשר</a>
                  </li>
                  <li>
                    <a href="/privacy">מדיניות פרטיות</a>
                  </li>
                </ul>
              </div>
              <div className="col-span-2">
                <h3 className="font-semibold mb-4">ReviewPro</h3>
                <p className="text-[var(--foreground-secondary)] text-sm">
                  סיקורי מוצרים מקיפים ואמינים. אנחנו אוספים מידע מכל המקורות -
                  Amazon, Reddit, ZAP ועוד - כדי לעזור לך לקבל החלטות קנייה
                  חכמות.
                </p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-[var(--border)] text-center text-[var(--foreground-secondary)] text-sm">
              © {new Date().getFullYear()} ReviewPro. כל הזכויות שמורות.
            </div>
          </div>
        </footer>

        {/* Mobile Navigation */}
        <nav className="mobile-nav">
          <a
            href="/"
            className="flex flex-col items-center gap-1 text-[var(--foreground-secondary)] hover:text-[var(--primary)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="text-xs">בית</span>
          </a>
          <a
            href="/search"
            className="flex flex-col items-center gap-1 text-[var(--foreground-secondary)] hover:text-[var(--primary)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <span className="text-xs">חיפוש</span>
          </a>
          <a
            href="/category/tech"
            className="flex flex-col items-center gap-1 text-[var(--foreground-secondary)] hover:text-[var(--primary)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
              <path d="M12 18h.01" />
            </svg>
            <span className="text-xs">טכנולוגיה</span>
          </a>
          <a
            href="/category/baby"
            className="flex flex-col items-center gap-1 text-[var(--foreground-secondary)] hover:text-[var(--primary)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 12h.01" />
              <path d="M15 12h.01" />
              <path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" />
              <path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1" />
            </svg>
            <span className="text-xs">תינוקות</span>
          </a>
        </nav>
      </body>
    </html>
  );
}

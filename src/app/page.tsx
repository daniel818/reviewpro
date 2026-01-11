import Link from "next/link";

// Sample data - will be replaced with Supabase data
const featuredReviews = [
  {
    id: "1",
    slug: "iphone-15-pro",
    name: "iPhone 15 Pro",
    category: "טכנולוגיה",
    image: "https://placehold.co/400x300/1e293b/6366f1?text=iPhone+15+Pro",
    score: 92,
    summary: "האייפון הטוב ביותר עד כה עם שיפורים משמעותיים במצלמה וביצועים",
    price: "₪4,499",
    priceSource: "KSP",
  },
  {
    id: "2",
    slug: "sony-wh1000xm5",
    name: "Sony WH-1000XM5",
    category: "טכנולוגיה",
    image: "https://placehold.co/400x300/1e293b/f59e0b?text=Sony+XM5",
    score: 95,
    summary: "אוזניות ביטול הרעשים הטובות בעולם עם נוחות יוצאת דופן",
    price: "₪1,299",
    priceSource: "Amazon",
  },
  {
    id: "3",
    slug: "bugaboo-fox-5",
    name: "Bugaboo Fox 5",
    category: "מוצרי תינוקות",
    image: "https://placehold.co/400x300/1e293b/10b981?text=Bugaboo+Fox+5",
    score: 88,
    summary: "עגלת פרימיום עם נסיעה חלקה ומראה יוקרתי",
    price: "₪4,990",
    priceSource: "BabyMaman",
  },
];

const categories = [
  {
    id: "tech",
    name: "טכנולוגיה",
    icon: "📱",
    description: "סמארטפונים, אוזניות, מחשבים ועוד",
    count: 156,
  },
  {
    id: "baby",
    name: "מוצרי תינוקות",
    icon: "🍼",
    description: "עגלות, כיסאות בטיחות, מוניטורים",
    count: 89,
  },
  {
    id: "home",
    name: "בית וגינה",
    icon: "🏠",
    description: "מכשירי חשמל, ריהוט, כלי עבודה",
    count: 0,
    comingSoon: true,
  },
  {
    id: "sports",
    name: "ספורט וכושר",
    icon: "🏃",
    description: "שעוני ספורט, ציוד אימון, אופניים",
    count: 0,
    comingSoon: true,
  },
];

function ScoreCircle({ score }: { score: number }) {
  const color =
    score >= 90
      ? "var(--success)"
      : score >= 70
        ? "var(--accent)"
        : "var(--danger)";

  return (
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold relative"
      style={
        {
          background: `conic-gradient(${color} ${score * 3.6}deg, var(--border) 0)`,
        } as React.CSSProperties
      }
    >
      <div className="absolute inset-1 rounded-full bg-[var(--card)]" />
      <span className="relative z-10">{score}</span>
    </div>
  );
}

function ProductCard({
  product,
}: {
  product: (typeof featuredReviews)[0];
}) {
  return (
    <Link href={`/review/${product.slug}`} className="card block group">
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <ScoreCircle score={product.score} />
        </div>
        <div className="absolute top-3 left-3">
          <span className="badge badge-primary">{product.category}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 group-hover:text-[var(--primary)] transition-colors">
          {product.name}
        </h3>
        <p className="text-[var(--foreground-secondary)] text-sm mb-4 line-clamp-2">
          {product.summary}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-[var(--primary)]">
              {product.price}
            </span>
            <span className="text-xs text-[var(--foreground-secondary)] mr-2">
              ב-{product.priceSource}
            </span>
          </div>
          <button className="btn btn-accent text-sm py-2 px-3">
            לסיקור המלא
          </button>
        </div>
      </div>
    </Link>
  );
}

function CategoryCard({ category }: { category: (typeof categories)[0] }) {
  if (category.comingSoon) {
    return (
      <div className="card p-6 opacity-60 cursor-not-allowed">
        <div className="text-4xl mb-3">{category.icon}</div>
        <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
        <p className="text-[var(--foreground-secondary)] text-sm mb-2">
          {category.description}
        </p>
        <span className="badge bg-[var(--border)] text-[var(--foreground-secondary)]">
          בקרוב
        </span>
      </div>
    );
  }

  return (
    <Link
      href={`/category/${category.id}`}
      className="card p-6 hover:border-[var(--primary)]"
    >
      <div className="text-4xl mb-3">{category.icon}</div>
      <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
      <p className="text-[var(--foreground-secondary)] text-sm mb-2">
        {category.description}
      </p>
      <span className="text-[var(--primary)] font-medium">
        {category.count} סיקורים →
      </span>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary)]/10 to-transparent" />

        {/* Floating shapes */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-[var(--primary)]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-20 w-48 h-48 bg-[var(--accent)]/20 rounded-full blur-3xl" />

        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              סיקורי מוצרים{" "}
              <span className="gradient-text">מקיפים ואמינים</span>
            </h1>
            <p className="text-xl text-[var(--foreground-secondary)] mb-8">
              אנחנו אוספים מידע מ-Amazon, Reddit, ZAP ועוד מקורות כדי לעזור לך
              לקבל החלטות קנייה חכמות
            </p>

            {/* Search Box */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="חפש מוצר..."
                  className="w-full px-4 py-3 pr-12 rounded-lg bg-[var(--card)] border border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all outline-none"
                />
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
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--foreground-secondary)]"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <button className="btn btn-primary">חיפוש</button>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              <span className="text-sm text-[var(--foreground-secondary)]">
                פופולריים:
              </span>
              <Link
                href="/search?q=iphone"
                className="text-sm text-[var(--primary)] hover:underline"
              >
                iPhone 15
              </Link>
              <Link
                href="/search?q=airpods"
                className="text-sm text-[var(--primary)] hover:underline"
              >
                AirPods Pro
              </Link>
              <Link
                href="/search?q=עגלה"
                className="text-sm text-[var(--primary)] hover:underline"
              >
                עגלת תינוק
              </Link>
              <Link
                href="/search?q=מוניטור"
                className="text-sm text-[var(--primary)] hover:underline"
              >
                מוניטור לתינוק
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Reviews */}
      <section className="py-12">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">סיקורים מובילים</h2>
            <Link
              href="/reviews"
              className="text-[var(--primary)] hover:underline hidden md:block"
            >
              כל הסיקורים →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredReviews.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link href="/reviews" className="btn btn-outline w-full">
              כל הסיקורים
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-[var(--background-secondary)]">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            קטגוריות
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            איך זה עובד?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">איסוף מידע</h3>
              <p className="text-[var(--foreground-secondary)] text-sm">
                אנחנו אוספים ביקורות ומידע מ-Amazon, Reddit, ZAP, KSP ואתרי
                יצרנים
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--accent)]/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">ניתוח AI</h3>
              <p className="text-[var(--foreground-secondary)] text-sm">
                בינה מלאכותית מנתחת את כל המידע ויוצרת סיקור מקיף ומאורגן
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--success)]/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✓</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">החלטה חכמה</h3>
              <p className="text-[var(--foreground-secondary)] text-sm">
                קבלו המלצות מבוססות נתונים והשוואת מחירים מכל החנויות
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)]">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              רוצים להישאר מעודכנים?
            </h2>
            <p className="text-white/80 mb-6">
              הירשמו לקבלת התראות על סיקורים חדשים ומבצעים חמים
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="האימייל שלכם"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 placeholder-white/60 text-white focus:bg-white/20 focus:border-white/40 outline-none transition-all"
              />
              <button className="btn bg-white text-[var(--primary)] hover:bg-white/90">
                הרשמה
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

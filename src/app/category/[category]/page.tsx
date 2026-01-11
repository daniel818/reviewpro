import Link from "next/link";
import { notFound } from "next/navigation";

// Category configuration
const categoryConfig: Record<
    string,
    {
        name: string;
        nameEn: string;
        icon: string;
        description: string;
        subcategories: { id: string; name: string }[];
    }
> = {
    tech: {
        name: "טכנולוגיה",
        nameEn: "Technology",
        icon: "📱",
        description: "סיקורים מקיפים על סמארטפונים, אוזניות, מחשבים, טאבלטים וגאדג'טים",
        subcategories: [
            { id: "smartphones", name: "סמארטפונים" },
            { id: "headphones", name: "אוזניות" },
            { id: "laptops", name: "מחשבים ניידים" },
            { id: "tablets", name: "טאבלטים" },
            { id: "smartwatches", name: "שעונים חכמים" },
            { id: "accessories", name: "אביזרים" },
        ],
    },
    baby: {
        name: "מוצרי תינוקות",
        nameEn: "Baby Products",
        icon: "🍼",
        description: "סיקורים על עגלות, כיסאות בטיחות, מוניטורים וציוד חיוני לתינוקות",
        subcategories: [
            { id: "strollers", name: "עגלות" },
            { id: "car-seats", name: "כיסאות בטיחות" },
            { id: "monitors", name: "מוניטורים" },
            { id: "cribs", name: "מיטות תינוקות" },
            { id: "feeding", name: "האכלה" },
            { id: "toys", name: "צעצועים" },
        ],
    },
    home: {
        name: "בית וגינה",
        nameEn: "Home & Garden",
        icon: "🏠",
        description: "סיקורים על מכשירי חשמל, ריהוט, כלי עבודה וציוד גינה",
        subcategories: [
            { id: "appliances", name: "מכשירי חשמל" },
            { id: "furniture", name: "ריהוט" },
            { id: "tools", name: "כלי עבודה" },
            { id: "garden", name: "גינה" },
        ],
    },
    sports: {
        name: "ספורט וכושר",
        nameEn: "Sports & Fitness",
        icon: "🏃",
        description: "סיקורים על ציוד אימון, אופניים, שעוני ספורט וציוד כושר",
        subcategories: [
            { id: "fitness", name: "ציוד כושר" },
            { id: "cycling", name: "אופניים" },
            { id: "running", name: "ריצה" },
            { id: "outdoor", name: "שטח" },
        ],
    },
};

// Sample products
const sampleProducts = [
    {
        id: "1",
        slug: "iphone-15-pro",
        name: "iPhone 15 Pro",
        category: "tech",
        subcategory: "smartphones",
        image: "https://placehold.co/400x300/1e293b/6366f1?text=iPhone+15+Pro",
        score: 92,
        summary: "האייפון הטוב ביותר עד כה עם שיפורים משמעותיים במצלמה וביצועים",
        price: 4499,
        priceSource: "KSP",
    },
    {
        id: "2",
        slug: "sony-wh1000xm5",
        name: "Sony WH-1000XM5",
        category: "tech",
        subcategory: "headphones",
        image: "https://placehold.co/400x300/1e293b/f59e0b?text=Sony+XM5",
        score: 95,
        summary: "אוזניות ביטול הרעשים הטובות בעולם עם נוחות יוצאת דופן",
        price: 1299,
        priceSource: "Amazon",
    },
    {
        id: "3",
        slug: "samsung-galaxy-s24-ultra",
        name: "Samsung Galaxy S24 Ultra",
        category: "tech",
        subcategory: "smartphones",
        image: "https://placehold.co/400x300/1e293b/10b981?text=Galaxy+S24+Ultra",
        score: 90,
        summary: "האנדרואיד הטוב ביותר עם עט S Pen ומצלמה פנומנלית",
        price: 4799,
        priceSource: "ZAP",
    },
    {
        id: "4",
        slug: "bugaboo-fox-5",
        name: "Bugaboo Fox 5",
        category: "baby",
        subcategory: "strollers",
        image: "https://placehold.co/400x300/1e293b/ec4899?text=Bugaboo+Fox+5",
        score: 88,
        summary: "עגלת פרימיום עם נסיעה חלקה ומראה יוקרתי",
        price: 4990,
        priceSource: "BabyMaman",
    },
    {
        id: "5",
        slug: "cybex-sirona-z",
        name: "Cybex Sirona Z i-Size",
        category: "baby",
        subcategory: "car-seats",
        image: "https://placehold.co/400x300/1e293b/8b5cf6?text=Cybex+Sirona+Z",
        score: 94,
        summary: "כיסא הבטיחות המוביל עם מערכת הגנה מתקדמת",
        price: 2499,
        priceSource: "BabyLove",
    },
];

function ScoreCircle({ score }: { score: number }) {
    const color =
        score >= 90 ? "var(--success)" : score >= 70 ? "var(--accent)" : "var(--danger)";

    return (
        <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold relative"
            style={{ background: `conic-gradient(${color} ${score * 3.6}deg, var(--border) 0)` }}
        >
            <div className="absolute inset-1 rounded-full bg-[var(--card)]" />
            <span className="relative z-10">{score}</span>
        </div>
    );
}

function ProductCard({ product }: { product: (typeof sampleProducts)[0] }) {
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
                            ₪{product.price.toLocaleString()}
                        </span>
                        <span className="text-xs text-[var(--foreground-secondary)] mr-2">
                            ב-{product.priceSource}
                        </span>
                    </div>
                    <span className="text-[var(--primary)] text-sm">לסיקור →</span>
                </div>
            </div>
        </Link>
    );
}

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ category: string }>;
}) {
    const { category } = await params;
    const config = categoryConfig[category];

    if (!config) {
        notFound();
    }

    // Filter products by category
    const products = sampleProducts.filter((p) => p.category === category);

    return (
        <div className="animate-fade-in">
            {/* Header */}
            <section className="py-12 bg-gradient-to-b from-[var(--primary)]/10 to-transparent">
                <div className="container">
                    <div className="flex items-center gap-2 text-sm text-[var(--foreground-secondary)] mb-4">
                        <Link href="/" className="hover:text-[var(--primary)]">
                            בית
                        </Link>
                        <span>/</span>
                        <span className="text-[var(--foreground)]">{config.name}</span>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-5xl">{config.icon}</span>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold">{config.name}</h1>
                            <p className="text-[var(--foreground-secondary)]">{config.description}</p>
                        </div>
                    </div>

                    {/* Subcategory filters */}
                    <div className="flex flex-wrap gap-2 mt-6">
                        <button className="btn btn-primary text-sm py-2 px-4">הכל</button>
                        {config.subcategories.map((sub) => (
                            <button key={sub.id} className="btn btn-outline text-sm py-2 px-4">
                                {sub.name}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-8">
                <div className="container">
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-[var(--foreground-secondary)]">
                            {products.length} סיקורים
                        </span>
                        <select className="bg-[var(--card)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm">
                            <option>מיון לפי: ציון</option>
                            <option>מיון לפי: מחיר - נמוך לגבוה</option>
                            <option>מיון לפי: מחיר - גבוה לנמוך</option>
                            <option>מיון לפי: חדש ביותר</option>
                        </select>
                    </div>

                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <span className="text-6xl mb-4 block">{config.icon}</span>
                            <h2 className="text-2xl font-bold mb-2">אין סיקורים עדיין</h2>
                            <p className="text-[var(--foreground-secondary)] mb-6">
                                אנחנו עובדים על הוספת סיקורים בקטגוריה הזו
                            </p>
                            <Link href="/" className="btn btn-primary">
                                חזרה לדף הבית
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Related Categories */}
            <section className="py-8 bg-[var(--background-secondary)]">
                <div className="container">
                    <h2 className="text-xl font-bold mb-6">קטגוריות נוספות</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(categoryConfig)
                            .filter(([key]) => key !== category)
                            .map(([key, cat]) => (
                                <Link
                                    key={key}
                                    href={`/category/${key}`}
                                    className="card p-4 text-center hover:border-[var(--primary)]"
                                >
                                    <span className="text-3xl">{cat.icon}</span>
                                    <div className="font-medium mt-2">{cat.name}</div>
                                </Link>
                            ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

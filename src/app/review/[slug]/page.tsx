import Link from "next/link";
import { notFound } from "next/navigation";

// Sample data - will be replaced with Supabase
const sampleReview = {
    product: {
        id: "1",
        slug: "iphone-15-pro",
        name: "iPhone 15 Pro",
        category: "טכנולוגיה",
        subcategory: "סמארטפונים",
        images: [
            "https://placehold.co/600x400/1e293b/6366f1?text=iPhone+15+Pro+1",
            "https://placehold.co/600x400/1e293b/6366f1?text=iPhone+15+Pro+2",
            "https://placehold.co/600x400/1e293b/6366f1?text=iPhone+15+Pro+3",
        ],
        specs: {
            "מסך": '6.1" Super Retina XDR',
            "מעבד": "A17 Pro",
            "זיכרון": "256GB / 512GB / 1TB",
            "מצלמה": "48MP + 12MP + 12MP",
            "סוללה": "3274mAh",
            "עמידות": "IP68",
        },
        overall_score: 92,
    },
    review: {
        id: "r1",
        summary_he: `האייפון 15 פרו מביא שיפורים משמעותיים בכל התחומים. עם מעבד A17 Pro החדש, המכשיר מציע ביצועים פנומנליים שמשאירים את המתחרים מאחור. המצלמה המשודרגת עם חיישן 48MP מייצרת תמונות מדהימות גם בתאורה חלשה.

השינוי לחיבור USB-C הוא צעד מבורך שמאפשר תאימות רחבה יותר לאביזרים. כפתור הפעולה החדש מחליף את מתג ההשתקה ומציע גמישות רבה יותר.

הגוף מטיטניום נותן תחושת פרימיום יוצאת דופן והמכשיר קל יותר מקודמו.`,
        pros: [
            "ביצועים מהירים במיוחד עם A17 Pro",
            "מצלמה מעולה בכל תנאי תאורה",
            "עיצוב טיטניום קל ויוקרתי",
            "חיבור USB-C סוף סוף",
            "כפתור פעולה חדש וגמיש",
            "מסך 120Hz חלק במיוחד",
        ],
        cons: [
            "מחיר גבוה מאוד",
            "חיי סוללה ממוצעים",
            "שינויים קלים מ-iPhone 14 Pro",
            "אין מטען בקופסה",
        ],
        detailed_analysis: {
            עיצוב: `גוף הטיטניום החדש הוא אולי השינוי הבולט ביותר מבחינה חיצונית. המכשיר מרגיש יוקרתי וקל יותר מקודמו. הקצוות המעוגלים יותר הופכים אותו לנוח יותר לאחיזה ממושכת.

הצבעים החדשים - במיוחד הכחול והטבעי - נראים מעולה ומוסיפים אופי ייחודי.`,
            ביצועים: `מעבד A17 Pro הוא הראשון בתעשייה בטכנולוגיית 3nm והתוצאות מרשימות. בבנצ'מרקים המכשיר משאיר את כל המתחרים מאחור.

משחקים כבדים רצים בצורה חלקה, עריכת וידאו מהירה במיוחד, ורב-משימתיות נעשית ללא כל עיכוב.`,
            מצלמה: `המצלמה הראשית של 48MP ממשיכה להרשים עם שיפורים נוספים בעיבוד התמונה. צילומי לילה טובים יותר, טווח דינמי רחב יותר, ופוקוס מהיר יותר.

מצב הפורטרט משופר עם זיהוי עומק טוב יותר. וידאו 4K ב-60fps נראה מקצועי.`,
            "תמורה למחיר": `המחיר גבוה - אין ספק. אבל למי שמחפש את הטוב ביותר בשוק, האייפון 15 פרו מספק. השאלה היא האם השדרוג שווה למי שיש לו כבר iPhone 14 Pro.

לבעלי מכשירים ישנים יותר (iPhone 12 ומטה) - זה שדרוג משמעותי שמשתלם.`,
        },
        sources: {
            amazon: { rating: 4.6, reviewCount: 12453 },
            reddit: { sentiment: 0.78, mentions: 3421 },
            zap: { rating: 4.8, reviewCount: 234 },
        },
        affiliate_links: {
            amazon: "https://amazon.com/dp/B0EXAMPLE",
            zap: "https://zap.co.il/example",
            ksp: "https://ksp.co.il/example",
        },
    },
    prices: [
        { source: "KSP", price: 4499, currency: "₪", url: "https://ksp.co.il/example" },
        { source: "ZAP", price: 4599, currency: "₪", url: "https://zap.co.il/example" },
        { source: "Amazon", price: 4799, currency: "₪", url: "https://amazon.com/example" },
        { source: "Ivory", price: 4649, currency: "₪", url: "https://ivory.co.il/example" },
    ],
};

function ScoreCircle({ score, size = "lg" }: { score: number; size?: "sm" | "md" | "lg" }) {
    const color = score >= 90 ? "var(--success)" : score >= 70 ? "var(--accent)" : "var(--danger)";
    const sizeClasses = {
        sm: "w-12 h-12 text-lg",
        md: "w-16 h-16 text-xl",
        lg: "w-24 h-24 text-3xl",
    };

    return (
        <div
            className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-bold relative`}
            style={{ background: `conic-gradient(${color} ${score * 3.6}deg, var(--border) 0)` }}
        >
            <div className="absolute inset-1 rounded-full bg-[var(--card)]" />
            <span className="relative z-10" style={{ color }}>
                {score}
            </span>
        </div>
    );
}

function SourceBadge({ source, data }: { source: string; data: { rating?: number; sentiment?: number; reviewCount?: number; mentions?: number } }) {
    const icons: Record<string, string> = {
        amazon: "📦",
        reddit: "💬",
        zap: "⚡",
        ksp: "🖥️",
    };

    return (
        <div className="flex items-center gap-2 px-3 py-2 bg-[var(--background-secondary)] rounded-lg">
            <span>{icons[source] || "📊"}</span>
            <div>
                <div className="text-sm font-medium capitalize">{source}</div>
                <div className="text-xs text-[var(--foreground-secondary)]">
                    {data.rating && `${data.rating}/5`}
                    {data.sentiment && `${Math.round(data.sentiment * 100)}% חיובי`}
                    {data.reviewCount && ` (${data.reviewCount.toLocaleString()})`}
                    {data.mentions && ` ${data.mentions.toLocaleString()} אזכורים`}
                </div>
            </div>
        </div>
    );
}

export default async function ReviewPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    // For now, use sample data
    // TODO: Replace with actual Supabase fetch
    if (slug !== "iphone-15-pro") {
        notFound();
    }

    const { product, review, prices } = sampleReview;
    const lowestPrice = prices.reduce((min, p) => (p.price < min.price ? p : min), prices[0]);

    return (
        <div className="animate-fade-in">
            {/* Breadcrumb */}
            <div className="bg-[var(--background-secondary)] py-3 border-b border-[var(--border)]">
                <div className="container">
                    <nav className="flex items-center gap-2 text-sm text-[var(--foreground-secondary)]">
                        <Link href="/" className="hover:text-[var(--primary)]">
                            בית
                        </Link>
                        <span>/</span>
                        <Link href={`/category/${product.category}`} className="hover:text-[var(--primary)]">
                            {product.category}
                        </Link>
                        <span>/</span>
                        <span className="text-[var(--foreground)]">{product.name}</span>
                    </nav>
                </div>
            </div>

            {/* Hero Section */}
            <section className="py-8">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Images */}
                        <div className="space-y-4">
                            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[var(--card)] border border-[var(--border)]">
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {product.images.slice(1).map((img, i) => (
                                    <div
                                        key={i}
                                        className="aspect-square rounded-lg overflow-hidden bg-[var(--card)] border border-[var(--border)] cursor-pointer hover:border-[var(--primary)] transition-colors"
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Info */}
                        <div>
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <span className="badge badge-primary mb-2">{product.category}</span>
                                    <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
                                </div>
                                <ScoreCircle score={product.overall_score} />
                            </div>

                            {/* Quick Summary */}
                            <p className="text-lg text-[var(--foreground-secondary)] mb-6">
                                {review.summary_he.split("\n")[0]}
                            </p>

                            {/* Sources */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {Object.entries(review.sources).map(([source, data]) => (
                                    <SourceBadge key={source} source={source} data={data} />
                                ))}
                            </div>

                            {/* Price Card */}
                            <div className="card p-6 mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <div className="text-sm text-[var(--foreground-secondary)]">
                                            המחיר הנמוך ביותר
                                        </div>
                                        <div className="text-3xl font-bold text-[var(--primary)]">
                                            {lowestPrice.currency}
                                            {lowestPrice.price.toLocaleString()}
                                        </div>
                                        <div className="text-sm text-[var(--foreground-secondary)]">
                                            ב-{lowestPrice.source}
                                        </div>
                                    </div>
                                    <a
                                        href={`/api/track?productId=${product.id}&platform=${lowestPrice.source.toLowerCase()}&url=${encodeURIComponent(lowestPrice.url)}`}
                                        className="btn btn-accent text-lg py-3 px-6"
                                    >
                                        קנה עכשיו
                                    </a>
                                </div>

                                {/* All Prices */}
                                <div className="border-t border-[var(--border)] pt-4">
                                    <h3 className="text-sm font-medium mb-3">השוואת מחירים</h3>
                                    <div className="space-y-2">
                                        {prices.map((p, i) => (
                                            <a
                                                key={i}
                                                href={`/api/track?productId=${product.id}&platform=${p.source.toLowerCase()}&url=${encodeURIComponent(p.url)}`}
                                                className="flex items-center justify-between p-2 rounded-lg hover:bg-[var(--background-secondary)] transition-colors"
                                            >
                                                <span className="font-medium">{p.source}</span>
                                                <span
                                                    className={
                                                        i === 0
                                                            ? "text-[var(--success)] font-bold"
                                                            : "text-[var(--foreground-secondary)]"
                                                    }
                                                >
                                                    {p.currency}
                                                    {p.price.toLocaleString()}
                                                </span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Quick Specs */}
                            <div className="card p-6">
                                <h3 className="font-semibold mb-4">מפרט טכני</h3>
                                <dl className="grid grid-cols-2 gap-3">
                                    {Object.entries(product.specs).map(([key, value]) => (
                                        <div key={key}>
                                            <dt className="text-sm text-[var(--foreground-secondary)]">{key}</dt>
                                            <dd className="font-medium">{value}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pros & Cons */}
            <section className="py-8 bg-[var(--background-secondary)]">
                <div className="container">
                    <h2 className="text-2xl font-bold mb-6 text-center">יתרונות וחסרונות</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {/* Pros */}
                        <div className="card p-6">
                            <h3 className="flex items-center gap-2 text-lg font-semibold text-[var(--success)] mb-4">
                                <span className="text-2xl">✓</span>
                                יתרונות
                            </h3>
                            <ul className="space-y-3">
                                {review.pros.map((pro, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="text-[var(--success)] mt-1">•</span>
                                        <span>{pro}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Cons */}
                        <div className="card p-6">
                            <h3 className="flex items-center gap-2 text-lg font-semibold text-[var(--danger)] mb-4">
                                <span className="text-2xl">✗</span>
                                חסרונות
                            </h3>
                            <ul className="space-y-3">
                                {review.cons.map((con, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="text-[var(--danger)] mt-1">•</span>
                                        <span>{con}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed Analysis */}
            <section className="py-8">
                <div className="container max-w-4xl">
                    <h2 className="text-2xl font-bold mb-6">סיקור מלא</h2>

                    {/* Summary */}
                    <div className="prose prose-lg max-w-none mb-8">
                        {review.summary_he.split("\n\n").map((paragraph, i) => (
                            <p key={i} className="text-[var(--foreground-secondary)] mb-4">
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    {/* Sections */}
                    {Object.entries(review.detailed_analysis).map(([title, content]) => (
                        <div key={title} className="mb-8">
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-[var(--primary)] rounded-full" />
                                {title}
                            </h3>
                            <div className="prose max-w-none">
                                {content.split("\n\n").map((paragraph, i) => (
                                    <p key={i} className="text-[var(--foreground-secondary)] mb-4">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Sticky CTA - Mobile */}
            <div className="sticky-cta md:hidden">
                <a
                    href={`/api/track?productId=${product.id}&platform=${lowestPrice.source.toLowerCase()}&url=${encodeURIComponent(lowestPrice.url)}`}
                    className="btn btn-accent w-full text-lg py-4"
                >
                    קנה ב-{lowestPrice.currency}
                    {lowestPrice.price.toLocaleString()} ב-{lowestPrice.source}
                </a>
            </div>
        </div>
    );
}

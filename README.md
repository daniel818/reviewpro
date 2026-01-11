# ReviewPro 🎯

מערכת סיקורי מוצרים מקיפה שאוספת מידע ממגוון מקורות, מסנתזת ביקורות באמצעות AI, ומשלבת affiliate links.

![ReviewPro](https://placehold.co/1200x400/1e293b/6366f1?text=ReviewPro+-+Product+Reviews)

## ✨ Features

- 🔍 **Multi-Source Data Collection** - איסוף מידע מ-Amazon, Reddit, ZAP, KSP ועוד
- 🤖 **AI-Powered Reviews** - סינתזה חכמה של ביקורות עם GPT-4
- 💰 **Affiliate Integration** - מעקב קליקים ואינטגרציה עם תוכניות affiliate
- 📱 **Mobile-First Design** - עיצוב responsive מותאם למובייל
- 🌐 **Hebrew & English** - תמיכה מלאה בעברית ו-RTL
- ⚡ **n8n Workflows** - אוטומציה מלאה של איסוף וסינתזה

## 🚀 Quick Start

### Prerequisites

- Node.js >= 20.9.0
- n8n instance (cloud or self-hosted)
- Supabase account
- OpenAI API key

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/reviewpro.git
cd reviewpro

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Fill in your API keys in .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📁 Project Structure

```
reviewpro/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/                # API endpoints
│   │   │   ├── generate/       # Trigger n8n review generation
│   │   │   ├── search/         # Product search
│   │   │   └── track/          # Affiliate click tracking
│   │   ├── category/[category] # Category pages
│   │   ├── review/[slug]/      # Review detail pages
│   │   ├── globals.css         # Design system
│   │   ├── layout.tsx          # Root layout with nav
│   │   └── page.tsx            # Homepage
│   │
│   └── lib/                    # Utilities
│       ├── supabase.ts         # Database client
│       ├── n8n.ts              # Workflow triggers
│       └── affiliate.ts        # Link generation
│
├── n8n-workflows/              # n8n workflow exports
│   ├── generate-review.json
│   ├── price-monitor.json
│   └── click-analytics.json
│
├── .env.example                # Environment template
└── README.md
```

## ⚙️ Environment Variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for GPT-4 | ✅ |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase admin key | ✅ |
| `N8N_WEBHOOK_URL` | n8n webhook base URL | ✅ |
| `N8N_WEBHOOK_SECRET` | Webhook auth secret | ✅ |
| `AMAZON_ASSOCIATE_TAG` | Amazon affiliate tag | Optional |
| `REDDIT_CLIENT_ID` | Reddit API credentials | Optional |

See `.env.example` for the complete list.

## 🔄 n8n Workflows

Import the workflows from `n8n-workflows/` directory:

### 1. Generate Review
Triggered when a new product URL is submitted. Collects data from multiple sources and generates a comprehensive review.

### 2. Price Monitor
Runs every 6 hours to check prices across all stores and update the database.

### 3. Click Analytics
Aggregates affiliate clicks and generates weekly reports.

## 📊 Database Schema

The app uses Supabase with these main tables:

- **products** - Product catalog with specs
- **reviews** - AI-generated reviews with sources
- **prices** - Price history from all stores
- **clicks** - Affiliate click tracking

Run the migration:

```sql
-- See supabase/migrations/ for full schema
```

## 🎨 Design System

The app uses a custom design system with:

- Glassmorphism cards
- Premium color palette (Indigo + Amber)
- Dark mode by default
- RTL support for Hebrew
- Mobile-first responsive design

## 🔧 Development

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Lint code
npm run lint
```

## 📝 License

MIT © ReviewPro

---

Built with ❤️ using Next.js, Supabase, n8n, and OpenAI

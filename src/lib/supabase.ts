import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side client with service role key (for admin operations)
export function createServerSupabaseClient() {
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    return createClient(supabaseUrl, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });
}

// Types for our database tables
export interface Product {
    id: string;
    name: string;
    slug: string;
    category: string;
    subcategory?: string;
    images: string[];
    specs: Record<string, string | number>;
    overall_score: number;
    created_at: string;
    updated_at: string;
}

export interface Review {
    id: string;
    product_id: string;
    summary_he: string;
    summary_en?: string;
    pros: string[];
    cons: string[];
    detailed_analysis: {
        design?: string;
        performance?: string;
        value?: string;
        features?: string;
        [key: string]: string | undefined;
    };
    sources: {
        amazon?: { rating: number; reviewCount: number };
        reddit?: { sentiment: number; mentions: number };
        zap?: { rating: number; reviewCount: number };
        [key: string]: { rating?: number; sentiment?: number; reviewCount?: number; mentions?: number } | undefined;
    };
    affiliate_links: {
        amazon?: string;
        zap?: string;
        ksp?: string;
        aliexpress?: string;
        [key: string]: string | undefined;
    };
    status: "draft" | "published";
    published_at?: string;
    created_at: string;
}

export interface Price {
    id: string;
    product_id: string;
    source: string;
    price: number;
    currency: string;
    url: string;
    checked_at: string;
}

export interface Click {
    id: string;
    product_id: string;
    source: string;
    platform: string;
    user_agent?: string;
    referrer?: string;
    clicked_at: string;
}

// Helper functions
export async function getProducts(category?: string) {
    let query = supabase
        .from("products")
        .select("*")
        .order("overall_score", { ascending: false });

    if (category) {
        query = query.eq("category", category);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as Product[];
}

export async function getProductBySlug(slug: string) {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error) throw error;
    return data as Product;
}

export async function getReviewByProductId(productId: string) {
    const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("product_id", productId)
        .eq("status", "published")
        .single();

    if (error && error.code !== "PGRST116") throw error; // PGRST116 = no rows found
    return data as Review | null;
}

export async function getPricesForProduct(productId: string) {
    const { data, error } = await supabase
        .from("prices")
        .select("*")
        .eq("product_id", productId)
        .order("price", { ascending: true });

    if (error) throw error;
    return data as Price[];
}

export async function trackClick(
    productId: string,
    platform: string,
    source: string,
    userAgent?: string,
    referrer?: string
) {
    const { error } = await supabase.from("clicks").insert({
        product_id: productId,
        platform,
        source,
        user_agent: userAgent,
        referrer,
    });

    if (error) throw error;
}

export async function searchProducts(query: string) {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .or(`name.ilike.%${query}%,category.ilike.%${query}%`)
        .order("overall_score", { ascending: false })
        .limit(20);

    if (error) throw error;
    return data as Product[];
}

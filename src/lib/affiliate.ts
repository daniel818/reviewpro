// Affiliate link configuration and utilities

interface AffiliateConfig {
    amazon: {
        tag: string;
        baseUrl: string;
    };
    aliexpress: {
        appKey: string;
        trackingId: string;
    };
    zap: {
        affiliateId?: string;
    };
    ksp: {
        affiliateId?: string;
    };
}

const config: AffiliateConfig = {
    amazon: {
        tag: process.env.AMAZON_ASSOCIATE_TAG || "",
        baseUrl: "https://www.amazon.com",
    },
    aliexpress: {
        appKey: process.env.ALIEXPRESS_APP_KEY || "",
        trackingId: process.env.ALIEXPRESS_TRACKING_ID || "",
    },
    zap: {
        affiliateId: process.env.ZAP_AFFILIATE_ID,
    },
    ksp: {
        affiliateId: process.env.KSP_AFFILIATE_ID,
    },
};

/**
 * Generate Amazon affiliate link
 */
export function generateAmazonLink(asin: string): string {
    if (!config.amazon.tag) {
        console.warn("Amazon Associate Tag not configured");
        return `https://www.amazon.com/dp/${asin}`;
    }
    return `https://www.amazon.com/dp/${asin}?tag=${config.amazon.tag}`;
}

/**
 * Generate AliExpress affiliate link
 */
export function generateAliExpressLink(productUrl: string): string {
    // AliExpress affiliate links typically use their portals redirect
    const encodedUrl = encodeURIComponent(productUrl);
    return `https://s.click.aliexpress.com/e/${encodedUrl}`;
}

/**
 * Add affiliate tracking to any supported URL
 */
export function addAffiliateTracking(
    url: string,
    platform: string
): string {
    try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname.toLowerCase();

        // Amazon
        if (hostname.includes("amazon")) {
            if (config.amazon.tag) {
                urlObj.searchParams.set("tag", config.amazon.tag);
            }
            return urlObj.toString();
        }

        // ZAP
        if (hostname.includes("zap.co.il")) {
            if (config.zap.affiliateId) {
                urlObj.searchParams.set("ref", config.zap.affiliateId);
            }
            return urlObj.toString();
        }

        // KSP
        if (hostname.includes("ksp.co.il")) {
            if (config.ksp.affiliateId) {
                urlObj.searchParams.set("partner", config.ksp.affiliateId);
            }
            return urlObj.toString();
        }

        // AliExpress
        if (hostname.includes("aliexpress")) {
            return generateAliExpressLink(url);
        }

        // Unknown platform - return as is
        return url;
    } catch {
        console.error("Invalid URL:", url);
        return url;
    }
}

/**
 * Track an affiliate click - call this before redirecting
 */
export function getTrackingUrl(
    productId: string,
    affiliateUrl: string,
    platform: string
): string {
    // Use our internal tracking endpoint that will log the click and redirect
    const params = new URLSearchParams({
        productId,
        platform,
        url: affiliateUrl,
    });
    return `/api/track?${params.toString()}`;
}

/**
 * Get all affiliate links for a product
 */
export interface ProductAffiliateLinks {
    amazon?: { url: string; price?: number };
    zap?: { url: string; price?: number };
    ksp?: { url: string; price?: number };
    aliexpress?: { url: string; price?: number };
    [key: string]: { url: string; price?: number } | undefined;
}

export function formatAffiliateLinks(
    productId: string,
    links: ProductAffiliateLinks
): ProductAffiliateLinks {
    const formatted: ProductAffiliateLinks = {};

    for (const [platform, data] of Object.entries(links)) {
        if (data?.url) {
            formatted[platform] = {
                ...data,
                url: getTrackingUrl(productId, addAffiliateTracking(data.url, platform), platform),
            };
        }
    }

    return formatted;
}

/**
 * Platform display configuration
 */
export const platformConfig: Record<string, { name: string; icon: string; color: string }> = {
    amazon: {
        name: "Amazon",
        icon: "📦",
        color: "#FF9900",
    },
    zap: {
        name: "ZAP",
        icon: "⚡",
        color: "#E31837",
    },
    ksp: {
        name: "KSP",
        icon: "🖥️",
        color: "#0066CC",
    },
    aliexpress: {
        name: "AliExpress",
        icon: "🛒",
        color: "#E62E04",
    },
    ivory: {
        name: "Ivory",
        icon: "🏪",
        color: "#00A651",
    },
    babymaman: {
        name: "BabyMaman",
        icon: "👶",
        color: "#FF69B4",
    },
};

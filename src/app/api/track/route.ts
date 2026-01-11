import { NextRequest, NextResponse } from "next/server";
import { trackClick } from "@/lib/supabase";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const productId = searchParams.get("productId");
    const platform = searchParams.get("platform");
    const url = searchParams.get("url");

    if (!productId || !platform || !url) {
        return NextResponse.json(
            { error: "Missing required parameters" },
            { status: 400 }
        );
    }

    try {
        // Log the click
        await trackClick(
            productId,
            platform,
            "web",
            request.headers.get("user-agent") || undefined,
            request.headers.get("referer") || undefined
        );

        // Redirect to the affiliate URL
        return NextResponse.redirect(url);
    } catch (error) {
        console.error("Error tracking click:", error);
        // Still redirect even if tracking fails
        return NextResponse.redirect(url);
    }
}

// Also handle POST for client-side tracking without redirect
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { productId, platform, source } = body;

        if (!productId || !platform) {
            return NextResponse.json(
                { error: "Missing required parameters" },
                { status: 400 }
            );
        }

        await trackClick(
            productId,
            platform,
            source || "web",
            request.headers.get("user-agent") || undefined,
            request.headers.get("referer") || undefined
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error tracking click:", error);
        return NextResponse.json(
            { error: "Failed to track click" },
            { status: 500 }
        );
    }
}

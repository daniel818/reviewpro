import { NextRequest, NextResponse } from "next/server";
import { searchProducts } from "@/lib/supabase";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");

    if (!query || query.length < 2) {
        return NextResponse.json(
            { error: "Search query must be at least 2 characters" },
            { status: 400 }
        );
    }

    try {
        const products = await searchProducts(query);

        return NextResponse.json({
            results: products,
            total: products.length,
            query,
        });
    } catch (error) {
        console.error("Search error:", error);
        return NextResponse.json(
            { error: "Search failed" },
            { status: 500 }
        );
    }
}

import { NextRequest, NextResponse } from "next/server";
import { triggerReviewGeneration } from "@/lib/n8n";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { productUrl, productName, category, priority } = body;

        // Validate required fields
        if (!productUrl || !category) {
            return NextResponse.json(
                { error: "productUrl and category are required" },
                { status: 400 }
            );
        }

        // Validate category
        const validCategories = ["tech", "baby", "home", "sports"];
        if (!validCategories.includes(category)) {
            return NextResponse.json(
                { error: `Invalid category. Must be one of: ${validCategories.join(", ")}` },
                { status: 400 }
            );
        }

        // Trigger the n8n workflow
        const result = await triggerReviewGeneration({
            productUrl,
            productName,
            category,
            priority: priority || "normal",
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error triggering review generation:", error);
        return NextResponse.json(
            { error: "Failed to trigger review generation" },
            { status: 500 }
        );
    }
}

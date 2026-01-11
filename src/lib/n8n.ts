const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL!;
const N8N_WEBHOOK_SECRET = process.env.N8N_WEBHOOK_SECRET!;

export interface GenerateReviewRequest {
    productUrl: string;
    productName?: string;
    category: "tech" | "baby" | "home" | "sports";
    priority?: "high" | "normal" | "low";
}

export interface GenerateReviewResponse {
    success: boolean;
    workflowId: string;
    message: string;
    estimatedTime?: number; // in minutes
}

export interface PriceCheckRequest {
    productId: string;
}

export interface WorkflowStatus {
    workflowId: string;
    status: "pending" | "running" | "completed" | "failed";
    progress?: number;
    result?: unknown;
    error?: string;
}

/**
 * Trigger the n8n workflow to generate a new product review
 */
export async function triggerReviewGeneration(
    request: GenerateReviewRequest
): Promise<GenerateReviewResponse> {
    const response = await fetch(`${N8N_WEBHOOK_URL}/generate-review`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${N8N_WEBHOOK_SECRET}`,
        },
        body: JSON.stringify({
            ...request,
            timestamp: new Date().toISOString(),
            source: "reviewpro-web",
        }),
    });

    if (!response.ok) {
        throw new Error(`n8n webhook failed: ${response.statusText}`);
    }

    return response.json();
}

/**
 * Trigger price check workflow for a specific product
 */
export async function triggerPriceCheck(
    request: PriceCheckRequest
): Promise<{ success: boolean; workflowId: string }> {
    const response = await fetch(`${N8N_WEBHOOK_URL}/check-prices`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${N8N_WEBHOOK_SECRET}`,
        },
        body: JSON.stringify({
            ...request,
            timestamp: new Date().toISOString(),
        }),
    });

    if (!response.ok) {
        throw new Error(`n8n price check failed: ${response.statusText}`);
    }

    return response.json();
}

/**
 * Get the status of a running workflow
 */
export async function getWorkflowStatus(
    workflowId: string
): Promise<WorkflowStatus> {
    const response = await fetch(
        `${N8N_WEBHOOK_URL}/workflow-status/${workflowId}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${N8N_WEBHOOK_SECRET}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error(`Failed to get workflow status: ${response.statusText}`);
    }

    return response.json();
}

/**
 * Trigger a batch update of all product prices
 */
export async function triggerBatchPriceUpdate(): Promise<{
    success: boolean;
    workflowId: string;
    productCount: number;
}> {
    const response = await fetch(`${N8N_WEBHOOK_URL}/batch-price-update`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${N8N_WEBHOOK_SECRET}`,
        },
        body: JSON.stringify({
            timestamp: new Date().toISOString(),
        }),
    });

    if (!response.ok) {
        throw new Error(`Batch price update failed: ${response.statusText}`);
    }

    return response.json();
}

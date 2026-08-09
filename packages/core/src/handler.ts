import type { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda'

type Handler = (event: APIGatewayProxyEventV2) => Promise<unknown>;

export function handler(fn: Handler) {
    return async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
        try {
            const result = await fn(event);
            return {
                statusCode: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(result)
            };
        } catch (err) {
            const message = err instanceof Error ? err.message : "Internal server error";
            const statusCode = message === "Unauthorized" ? 401 : 500;
            return {
                statusCode,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ error: message }),
            };
        }
    };
}

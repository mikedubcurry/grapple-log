import type { APIGatewayProxyEventV2 } from "aws-lambda";

// single seam for auth, swap for JWT-Cognito flow
export function getUserId(_event: APIGatewayProxyEventV2): string {
    return 'user-123'
}

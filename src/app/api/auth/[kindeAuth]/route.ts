import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: any
): Promise<Response | void> {
    const endpoint = params.kindeAuth;
    await handleAuth(request, endpoint);
    return new Response(null, { status: 200 });
}

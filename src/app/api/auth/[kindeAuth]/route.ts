import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const endpoint = req.query.kindeAuth as string;

    return handleAuth(req, endpoint)(req, res);
}

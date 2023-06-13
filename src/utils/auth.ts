import { verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const JWT_SECRET = process.env.JWT_SECRET;

export default function authenticateToken(req : NextApiRequest, res: NextApiResponse) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
        const payload = verify(token, JWT_SECRET!);
        return payload;
    } catch (err) {
        console.error(err);
        return res.status(401).json({ error: "Unauthorized" });
    }
}


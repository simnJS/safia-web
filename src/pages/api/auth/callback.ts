import { sign } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { stringify } from "querystring";

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const DISCORD_REDIRECT_URI = process.env.DISCORD_REDIRECT_URI;
const JWT_SECRET = process.env.JWT_SECRET;

const getAccessToken = async (code: string) => {
    const params = new URLSearchParams({
        client_id: DISCORD_CLIENT_ID!,
        client_secret: DISCORD_CLIENT_SECRET!,
        grant_type: "authorization_code", 
        code,
        redirect_uri: DISCORD_REDIRECT_URI!,
        scope: "identify email guilds",
    });

    const response = await axios.post("https://discord.com/api/oauth2/token", params);

    return response.data;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { code } = req.query;
        const { access_token, refresh_token } = await getAccessToken(code as string);

        const user = await axios.get("https://discord.com/api/users/@me", {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },

        }).then((res) => res.data);

        const guilds = await axios.get("https://discord.com/api/users/@me/guilds", {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }).then((res) => res.data);
        

        const userData = {
            ...user,
            guilds,
            access_token,
            refresh_token,
        };

        const token = sign(userData, JWT_SECRET!, {
            expiresIn: "1h",
        });

        // get size of the token
        const size = Buffer.byteLength(token, "utf8");

        console.log(`Token size: ${size} bytes`);

        res.redirect(`/api/auth/login?token=${token}`);
    } catch (err: any) {
        console.error(err);
        res.status(err.status || 500).json({
            code: err.code,
            error: err.message,
        });
    }
};





import { sign } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_REDIRECT_URI = process.env.DISCORD_REDIRECT_URI;

const redirectUri = encodeURIComponent(DISCORD_REDIRECT_URI!);

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    try {
        const url = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=identify%20email%20guilds`;

        res.redirect(url);
    } catch (err : any) {
        console.error(err);
        res.status(err.status || 500).json({
            code: err.code,
            error: err.message
        });
    }
}
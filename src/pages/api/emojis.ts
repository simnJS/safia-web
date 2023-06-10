import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { guild_id } = req.query;

    try {
        const response = await fetch(`https://discord.com/api/v10/guilds/${guild_id}/emojis`, {
            headers: {
                'Authorization': `Bot ${process.env.BOT_TOKEN}`
            }
        });

        if(response.ok) {
            const emojis = await response.json();
            res.status(200).json(emojis);
        }

        else {
            const errorData = await response.json();
            res.status(response.status).json({ error: errorData });
        }

    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
}
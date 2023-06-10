import { NextApiRequest, NextApiResponse } from 'next';

interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  try {
    const response = await fetch(`https://discord.com/api/v10/users/${userId}`, {
      headers: {
        'Authorization': `Bot ${process.env.BOT_TOKEN}`
      }
    });

    if (response.ok) {
      const userInfo = await response.json() as DiscordUser;
      res.status(200).json(userInfo);
    } else {
      const errorData = await response.json();
      res.status(response.status).json({ error: errorData });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}

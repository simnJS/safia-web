import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Obtenir le nombre de guildes et le nombre total d'utilisateurs du bot en utilisant l'API Discord
  if (req.method === 'GET') {
    try {
      const response = await fetch('https://discord.com/api/v10/users/@me/guilds', {
        headers: {
          Authorization: `Bot ${process.env.BOT_TOKEN}`,
        },
      });

      if (response.ok) {
        const guilds = await response.json();
        const numGuilds = guilds.length;

        let totalMembers = 0;
        for (const guild of guilds) {
          const guildId = guild.id;
          const guildResponse = await fetch(`https://discord.com/api/v10/guilds/${guildId}?with_counts=true`, {
            headers: {
              Authorization: `Bot ${process.env.BOT_TOKEN}`,
            },
          });
          const guildData = await guildResponse.json();
          totalMembers += guildData.approximate_member_count; // Utilisez la propriété approximate_member_count pour obtenir le nombre total d'utilisateurs
          
        }

        res.status(200).json({
          numGuilds,
          totalMembers,
        });
      } else {
        const errorData = await response.json();
        console.log(`API Error: ${errorData}`);
        res.status(response.status).json({ error: errorData });
      }
    } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }
}

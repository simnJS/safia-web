import { NextApiRequest, NextApiResponse } from 'next'
import prisma_instance from '@/utils/prisma_instance'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { guild_id, user_id } = req.query

  try {
    const guild = await prisma_instance.guild.findUnique({
      where: {
        guildId: guild_id as string
      }
    })

    if (!guild) {
      return res.status(404).json({ error: 'Guild not found' })
    }

    const member = await prisma_instance.member.findFirst({
      where: {
        memberId: user_id as string,
        guildId: {
          equals: guild?.id,
        },
      },
      include: {
        sanctions: true
        }
    })

    if (!member) {
      return res.status(404).json({ error: 'Member not found' })
    }

    const jsonSanctionData = JSON.stringify(member?.sanctions)
    const jsonMemberData = JSON.stringify(member)

    return res.status(200).json({ jsonSanctionData, jsonMemberData })
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

import { Member } from "@prisma/client";
import prisma_instance from "../utils/prisma_instance";

export class DB {
  public static async getMember(guildId: string, memberId: string) {
    const guild = await prisma_instance.guild.findUniqueOrThrow({
      where: {
        guildId: guildId,
      },
    });


    if (!guild) return false;

    const member = await prisma_instance.member.findFirstOrThrow({
      where: {
        memberId: memberId,
        guildId: {
          equals: guild?.id,
        },
      },
    });

    console.log(member);
    return member;
  }

  public static async getSanctions(member : Member) {

    const sanctions = await prisma_instance.member.findMany({
        where: {
            memberId: member.memberId,
            guildId: member.guildId      
        },
        select: {
            sanctions: true
        }
    })

    return sanctions;


  }
}

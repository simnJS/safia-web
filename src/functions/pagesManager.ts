import { Member, Sanction } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

const createPage = async (data: Sanction[], member: Member) => {
    // Générer un nom aléatoire pour la page
    const randomName = generateRandomName();
    const url = `http://localhost:3000/${randomName}`;
    const pagePath = path.join(process.cwd(), 'src/pages', `${randomName}.tsx`);

    // Créer le contenu de la page avec les données spécifiées
    const pageContent = await generatePageContent(data, member);

    // Écrire le contenu de la page dans un fichier
    fs.writeFileSync(pagePath, pageContent);

    // Définir un délai pour supprimer la page après 10 minutes (600 000 millisecondes)
    setTimeout(() => {
        fs.unlinkSync(pagePath);
    }, 500000);

    return url;
};

const generateRandomName = (): string => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const length = 15;
    let randomName = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomName += characters[randomIndex];
    }

    return randomName;
};

const generatePageContent = async (sanctionData: Sanction[], memberData: Member) => {

    interface DiscordUser {
        id: string;
        username: string;
        discriminator: string;
        avatar: string | null;
        // Add any other properties you want to retrieve
      }

    const jsonSanctionData = JSON.stringify(sanctionData);
    const jsonMemberData = JSON.stringify(memberData);

    let iconUrl = '';
    let userName = "" 
    for (const sanction of sanctionData) {
      const userResponse = await fetch(`https://discord.com/api/v10/users/${sanction.moderator}`, {
        headers: {
          'Authorization': `Bot ${process.env.BOT_TOKEN}`
        }
      });

      if (userResponse.ok) {
        let userInfo = await userResponse.json() as DiscordUser;
        iconUrl = `https://cdn.discordapp.com/avatars/${userInfo.id}/${userInfo.avatar}.png`;
        userName = userInfo.username;

        break;
      }
    }

    console.log('URL de l\'avatar :', iconUrl);

    const content = `
        import React from 'react';
    
        const Test = () => {
            const sanctionsData = ${jsonSanctionData};
            const memberData = ${jsonMemberData};
            const iconUrl = '${iconUrl}';
            const moderatorName = '${userName}';
    
            return (
                <div className="flex flex-col items-center justify-center h-screen">
                  <h1 className="text-3xl font-bold mb-8" style={{ color: 'white' }}> Casier de {memberData.username}</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl w-full gap-6">
                  {sanctionsData.map((sanction) => (
                    <div
                      key={sanction.id}
                      className="bg-gray-900 rounded-xl shadow-md w-full overflow-hidden"
                    >
                      <div className="px-4 py-3 text-gray-100 font-bold border-b border-gray-800 text-center uppercase">
                        <p>{sanction.type}</p>
                      </div>
                      <div className="p-4 grid grid-cols-1 gap-3">
                        <div>
                          <p className="text-gray-500 text-xs uppercase font-bold mb-1">
                            Durée&nbsp;:
                          </p>
                          <p className="text-gray-100 text-base font-semibold">
                            {sanction.duration ?? 'Aucune durée spécifiée'}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs uppercase font-bold mb-1">
                            Raison&nbsp;:
                          </p>
                          <p className="text-gray-100 text-base font-semibold">
                            {sanction.reason ?? 'Aucune raison spécifiée'}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs uppercase font-bold mb-1">
                            Sanctionné le&nbsp;:
                          </p>
                          <p className="text-gray-100 text-base font-semibold">
                            {new Date(
                              "Tue Jun 06 2023 17:22:13 GMT-0400 (Eastern Daylight Time)"
                            ).toLocaleString("fr-FR", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="bg-black bg-opacity-50 px-4 py-3 flex items-center justify-between gap-2">
                        <p className="text-gray-500 text-xs uppercase font-bold">
                          Averti par&nbsp;:
                        </p>
                        <div className="flex items-center justify-start gap-2">
                          <p className="text-gray-100 text-sm font-semibold">
                            {moderatorName}
                          </p>
                          <img
                            src={iconUrl}
                            alt={moderatorName}
                            className="rounded-full object-cover h-6 w-6"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  </div>
                </div>
              );
        };

        export default Test;
    `;

    return content;
};




export default createPage;

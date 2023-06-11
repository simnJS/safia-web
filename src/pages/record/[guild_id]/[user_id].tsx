import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../../../styles/components/Card.module.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Head from 'next/head';

interface DiscordUser {
    id: string;
    username: string;
    discriminator: string;
    avatar: string | null;
    // Add any other properties you want to retrieve
}

interface jsonMemberData {
    username: string;
}

export default function Record() {
    const router = useRouter();
    const [jsonSanctionData, setJsonSanctionData] = useState<string | null>(null);
    const [jsonMemberData, setJsonMemberData] = useState<string | null>(null);
    const [iconUrl, setIconUrl] = useState<string>('');
    const [userName, setUserName] = useState<string>('');

    useEffect(() => {
        async function fetchData() {
            if (router.query.guild_id && router.query.user_id) {
                const response = await fetch(
                    `/api/record?guild_id=${router.query.guild_id}&user_id=${router.query.user_id}`
                );
                if (response.status === 404) {
                    return (
                        <section className={styles.background} id="features">
                            <Header />
                            <div className="flex flex-col items-center justify-center h-screen">
                                <h1 className="text-3xl font-bold mb-8" style={{ color: 'white' }}>
                                    Aucune sanction trouvée
                                </h1>
                            </div>
                            <Footer />
                        </section>

                    )
                }

                console.log(response.status);

                if (response.status === 500) {
                    return <h1>Une erreur est survenue</h1>;
                }

                const data = await response.json();

                if (response.ok) {
                    setJsonSanctionData(data.jsonSanctionData);
                    setJsonMemberData(data.jsonMemberData);
                    await fetchDiscordUser(data.jsonSanctionData);

                    document.title = `Casier de ${JSON.parse(data.jsonMemberData).username} | Safia`;
                    const metaDescription = `Casier de ${JSON.parse(data.jsonMemberData).username} - Votre description personnalisée ici`;
                    const metaTags = document.getElementsByTagName('meta');

                    for (let i = 0; i < metaTags.length; i++) {
                        if (metaTags[i].getAttribute('name') === 'description') {
                          metaTags[i].setAttribute('content', metaDescription);
                          break;
                        }
                    }

                } else {
                    console.error(data.error);
                }
            }
        }

        async function fetchDiscordUser(sanctionData: string) {
            const parsedSanctionData = JSON.parse(sanctionData);
            for (const sanction of parsedSanctionData) {
                const userResponse = await fetch(`/api/discord-user?userId=${sanction.moderator}`, {
                    headers: {
                        Authorization: `Bot ${process.env.BOT_TOKEN}`,
                    },
                });
                console.log(userResponse);

                if (userResponse.ok) {
                    const userInfo = (await userResponse.json()) as DiscordUser;
                    setIconUrl(`https://cdn.discordapp.com/avatars/${userInfo.id}/${userInfo.avatar}.png`);
                    setUserName(userInfo.username);
                    break;
                }
            }
        }

        fetchData();
    }, [router.query.guild_id, router.query.user_id]);

    if (jsonSanctionData === null || jsonMemberData === null) {
        return (
            <section className={styles.background} id="features">
                <Header />
                <div className="flex flex-col items-center justify-center h-screen">
                    <div className="spinner"></div>
                </div>
                <Footer />
            </section>
        );
    }

    return (
        <section className={styles.background} id="features">
            <div className={styles.container}>
                <Header />
                <div className="flex flex-col items-center justify-center py-16">
                    <h1 className="text-3xl font-bold mb-8" style={{ color: 'white' }}>
                        Casier de {JSON.parse(jsonMemberData).username}
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl w-full gap-6">
                        {JSON.parse(jsonSanctionData).map((sanction: any) => (
                            <div
                                key={sanction.id}
                                className="bg-gray-900 rounded-xl shadow-md w-full overflow-hidden"
                            >
                                <div className="px-4 py-3 text-gray-100 font-bold border-b border-gray-800 text-center uppercase">
                                    <p>{sanction.type}</p>
                                </div>
                                <div className="p-4 grid grid-cols-1 gap-3">
                                    <div>
                                        <p className="text-gray-500 text-xs uppercase font-bold mb-1">Durée&nbsp;:</p>
                                        <p className="text-gray-100 text-base font-semibold">
                                            {sanction.duration ?? 'Aucune durée spécifiée'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-xs uppercase font-bold mb-1">Raison&nbsp;:</p>
                                        <p className="text-gray-100 text-base font-semibold">
                                            {sanction.reason ?? 'Aucune raison spécifiée'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-xs uppercase font-bold mb-1">
                                            Sanctionné le&nbsp;:
                                        </p>
                                        <p className="text-gray-100 text-base font-semibold">
                                            {new Date(sanction.date).toLocaleDateString('fr-FR', {
                                                minute: 'numeric',
                                                hour: 'numeric',
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-black bg-opacity-50 px-4 py-3 flex items-center justify-between gap-2">
                                    <p className="text-gray-500 text-xs uppercase font-bold">Averti par&nbsp;:</p>
                                    <div className="flex items-center justify-start gap-2">
                                        <p className="text-gray-100 text-sm font-semibold">{userName}</p>
                                        <img
                                            src={iconUrl}
                                            alt={userName}
                                            className="rounded-full object-cover h-6 w-6"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Footer />
            </div>
        </section>
    );

}

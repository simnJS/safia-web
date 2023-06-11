import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../../../styles/components/Card.module.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface EmojiData {
    name: string;
    id: string;
}

export default function Emojis() {
    const router = useRouter();
    const [emojis, setEmojis] = useState<EmojiData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            if (router.query.guild_id) {
                const response = await fetch(`/api/emojis?guild_id=${router.query.guild_id}`);

                if (response.status === 404) {
                    setEmojis([{ name: 'No data found', id: '' }]);
                    setIsLoading(false);
                    return;
                }

                const data = await response.json();

                if (response.ok) {
                    setEmojis(data);
                } else {
                    console.error(data.error);
                }

                setIsLoading(false);
            }
        }

        fetchData();
    }, [router.query.guild_id]);

    if (isLoading) {
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

    if (emojis[0].name === 'No data found') {
        return (
            <section className={styles.background} id="features">
                <Header />
                <div className="flex flex-col items-center justify-center h-screen">
                    <h1 className="text-3xl font-bold mb-8" style={{ color: 'white' }}>
                        Aucun emoji trouvé
                    </h1>
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
                        Voici la liste des emojis du serveur
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl w-full gap-6">
                        {emojis.map((emoji, index) => (
                            <div
                                key={index}
                                className="bg-gray-900 rounded-xl shadow-md w-full overflow-hidden"
                            >
                                <div className="px-4 py-3 text-gray-100 font-bold border-b border-gray-800 text-center uppercase">
                                    <p>{emoji.name}</p>
                                </div>
                                <div className="p-4 flex flex-col items-center justify-center">
                                    <img
                                        src={`https://cdn.discordapp.com/emojis/${emoji.id}.webp?size=44&quality=lossless`}
                                        alt={emoji.name}
                                        className="w-24 h-24 mb-4"
                                    />
                                    <p className="text-gray-100 text-sm">
                                        <span className="font-bold">ID:</span> {emoji.id}
                                    </p>
                                    <p className="text-gray-100 text-sm">
                                        <a
                                            href={`https://cdn.discordapp.com/emojis/${emoji.id}.webp?size=44&quality=lossless`}
                                            download={`${emoji.name}.webp`}
                                            className="underline cursor-pointer"
                                        >
                                            Click here to download
                                        </a>
                                    </p>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    );




}

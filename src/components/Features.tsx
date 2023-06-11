import styles from '../styles/components/Features.module.css';

export default function Features() {
    return (
        <section className={styles.features} id="features">
            <div className={styles.container}>
                <div className={styles.box}>
                    <h2>01</h2>
                    <h3>Modération avancée et sécurisée</h3>
                    <p>Des commandes de modération puissantes et un système d'auto-modération pour maintenir votre serveur sûr et propre.</p>
                </div>
                <div className={styles.box}>
                    <h2>02</h2>
                    <h3>Système d'XP personnalisable</h3>
                    <p>Récompensez l'activité de vos membres avec un système d'XP entièrement configurable, permettant des rôles, des privilèges et des récompenses spéciales.</p>
                </div>
                <div className={styles.box}>
                    <h2>03</h2>
                    <h3>Protection contre le spam et les trolls</h3>
                    <p>Détectez et bloquez automatiquement les comportements indésirables tels que le spam, les liens suspects et les messages offensants.</p>
                </div>
                <div className={styles.box}>
                    <h2>04</h2>
                    <h3>Configuration personnalisée</h3>
                    <p>Personnalisez le comportement du bot selon vos préférences, y compris les préfixes de commande, les autorisations des rôles et les messages de bienvenue.</p>
                </div>
                <div className={styles.box}>
                    <h2>05</h2>
                    <h3>Statistiques du serveur</h3>
                    <p>Obtenez des informations détaillées sur l'activité de votre serveur, y compris le nombre de membres, les messages envoyés et les pics d'activité.</p>
                </div>
                <div className={styles.box}>
                    <h2>06</h2>
                    <h3>Support réactif</h3>
                    <p>Bénéficiez d'une assistance rapide et efficace en cas de problème ou de question, avec une équipe de support dédiée.</p>
                </div>
            </div>
        </section>
    );
}

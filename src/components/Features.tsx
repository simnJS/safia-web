import styles from '../styles/components/Features.module.css';

export default function Features() {
  return (
    <section className={styles.features} id="features">
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>01</h2>
        <h3>Un serveur sûr et propre</h3>
        <p>
          Garder votre serveur protégé grâce à toutes les commandes de modération et d'auto-modération
        </p>
      </div>
      <div className={styles.box}>
        <h2>02</h2>
        <h3>Manipulation d'image</h3>
        <p>
          Amusez-vous avec la photo de profil de vos membres sur votre discord grâce à plusieurs commandes de manipulation d'images.
        </p>
      </div>
      <div className={styles.box}>
        <h2>03</h2>
        <h3>Rapide comme l'éclair</h3>
        <p>
          N'attendez pas la moindre seconde avant que une commande vous réponde pour une expérience de folie.
        </p>
      </div>
      <div className={styles.box}>
        <h2>04</h2>
        <h3>Statistique</h3>
        <p>
          Obtenez un maximum de statistiques sur votre serveur et les membres de votre serveur.
        </p>
      </div>
      <div className={styles.box}>
        <h2>05</h2>
        <h3>Ne vous ennuyez plus</h3>
        <p>
          Amusez-vous avec toutes les commandes fun que le bot dispose.
        </p>
      </div>
      <div className={styles.box}>
        <h2>06</h2>
        <h3>Configuration simple</h3>
        <p>
          Ne vous torturez plus à configurer votre bot tout est configurable via de simples commandes.
        </p>
      </div>
    </div>
  </section>
  );
}

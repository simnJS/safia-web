import styles from '../styles/components/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Copyright © 2022 - SafiaBot</p>
      <p className={styles.credit}>Développé par SimnJS ❤️ - v.1.0.0</p>
      <a className={styles.footer_link} href="">Visiter notre serveur discord</a>
    </footer>
  );
}

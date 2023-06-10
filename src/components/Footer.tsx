import styles from '../styles/components/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
        <div className='flex-1'>
            <p>Copyright © 2023 - SafiaBot</p>
        </div>
        <p className={styles.credit}>Développé par SimnJS ❤️ - v.1.0.0</p>
        <div className="flex-1 flex justify-end">
            <a className={styles.footer_link} href="">Visiter notre serveur discord</a>
        </div>
    </footer>
  );
}

import styles from '../styles/components/Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
        <div className='flex-1'>
        <a href="/" className="footer-link">
            <img className={styles.img} src="/logo.png" alt="Logo"/>
        </a>
        </div>
        <h1 className={styles.h1}>SAFIA</h1>
        <div className="flex-1 flex justify-end">
            <a href="">Ajouter à discord</a>
        </div>
    </header>
  );
}

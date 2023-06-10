import styles from '../styles/components/Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <img className={styles.img} src="/logo.png" alt="Logo" />
      <h1 className={styles.h1}>SAFIA</h1>
      <a href="">Ajouter à discord</a>
    </header>
  );
}

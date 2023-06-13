import { useEffect } from 'react';
import styles from '../styles/components/Landing.module.css';

export default function Landing() {

    const Login = () => {
        useEffect(() => {
            const login = async () => {
                try {
                    const response = await fetch("/api/auth/login");
                    window.location.href = response.url;
                } catch (error) {
                    console.log(error);
                }
            };
            login();
        }, []);
        return null;
    }

    return (
        <section className={styles.landing}>
            <div className={styles.img}>
                <img src="/img/exemple.png" alt="exemple" />
            </div>
            <div className={styles.text}>
                <h2>Inviter vite Safia!</h2>
                <p className={styles.subtitle}>
                    Votre nouveau bot discord de compagnie !
                </p>
                <div className={styles.links}>
                    <a className={styles.landing_link} href="">Ajouter à Discord</a>
                    <a className={styles.landing_link} href="">Documentation</a>
                    {/* <a className={styles.landing_link} href="">Dashboard</a> */}
                    <a className={styles.landing_link} href="/api/auth/login">Dashboard</a>

                </div>
            </div>
        </section>
    );
}

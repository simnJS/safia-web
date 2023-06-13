import React from 'react';
import useSWR from 'swr';
import styles from '../styles/components/Banner.module.css';

const fetcher = (url : string) => fetch(url).then((response) => response.json());

export default function Banner() {
//   const { data, error } = useSWR('/api/bot-stats', fetcher);

//   if (error) {
//     return (
//       <div className={styles.banner}>
//         <h3>Erreur lors du chargement des données</h3>
//       </div>
//     );
//   }

  return (
    <div className={styles.banner}>
      {/* {data ? ( */}
        <h3 id="stats">
          Utilisé par plus de 50 guildes avec 10000 utilisateurs
        </h3>
      {/* ) : ( */}
        {/* <div className="flex flex-col items-center justify-center h-screen">
          <div className="spinner"></div>
        </div> */}
      {/* )} */}
    </div>
  );
}
